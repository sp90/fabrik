// Native modules
const fs = require("fs");
const process = require('process');
const path = require("path");

// External modules
const _ = require("lodash");

const helpers = require("./helpers");
const utility = require("./utility");

// Basic config
const defaultConfig = require("./_config");

const moduleDefaults = {
  nested: true
};

const fabrik = async (input, flags) => {
  const projectRoot = process.cwd();
  const customConfigPath = path.join(projectRoot, "fabrik.config.js");
  const customConfigExists = fs.existsSync(customConfigPath);

  // Check if config exists
  if (!customConfigExists) {
    return helpers.missingConfig();
  }

  const customConfig = require(customConfigPath);

  const configSettings = {
    ...defaultConfig,
    ...customConfig
  };

  // Default to root if basePath dosn't exists
  if (!configSettings.basePath) {
    configSettings.basePath = projectRoot;
  }

  // Check if modules been configured
  if (!(configSettings.modules && configSettings.modules.length)) {
    return helpers.missingModuleConfig();
  }

  // Create baseTemplatePath
  const baseTemplatePath = path.join(
    configSettings.basePath,
    configSettings.templatesFolder
  );

  // Setup based on config
  if (!_.isUndefined(configSettings.interpolate)) {
    _.templateSettings.interpolate = configSettings.interpolate;
  }

  // Test if args are passed?
  if (!input || !(flags.type && flags.type.length)) {
    return helpers.missingArguments();
  }

  // const dataObj = {
  //   name: input,
  //   nameFirstLetterCapitalized: helpers.capitalizeFirstLetter(input),
  //   nameLower: input.toLowerCase(),
  //   nameSlugified: helpers.slugify(input)
  // };

  const dataObj = {
    FABRIK_NAME: input,
    FABRIK_NAME_FIRST_LETTER_CAPITALIZED: helpers.capitalizeFirstLetter(input),
    FABRIK_NAME_LOWER: input.toLowerCase(),
    FABRIK_NAME_SLUGIFIED: helpers.slugify(input)
  };

  const moduleUserSettings = configSettings.modules.find(obj => {
    return obj.type === flags.type || obj.alias === flags.type;
  });

  const moduleSettings = {
    ...moduleDefaults,
    ...moduleUserSettings
  };

  const buildRes = await helpers.build(moduleSettings, baseTemplatePath);

  // If its not the same length
  if (moduleSettings.fileTypes.length !== buildRes.filesPath.length) {
    return helpers.missingTemplates(
      `${baseTemplatePath}/${moduleSettings.type}`,
      moduleSettings.fileTypes,
      buildRes.filesPath
    );
  }

  const moduleDirName = moduleSettings.nested
    ? path.join(configSettings.basePath, buildRes.outputPath, dataObj.FABRIK_NAME_SLUGIFIED)
    : path.join(configSettings.basePath, buildRes.outputPath);

  if (!fs.existsSync(moduleDirName) && moduleSettings.nested) {
    if (!flags.dryRun) {
      fs.mkdirSync(moduleDirName, { recursive: true });
    }
  }

  const createFiles = buildRes.filesPath.map(async filePath => {
    const fileContent = await helpers.read(filePath);
    const pathParts = filePath.split("/");
    const pathEnding = pathParts[pathParts.length - 1];
    const n = pathEnding.indexOf(".");
    const resultEnding = pathEnding.substring(n);

    const hasMatchingEnding = configSettings.fileTypeSettings.find(obj => {
      return obj.fileType === resultEnding;
    });

    let newFilePath;

    if (hasMatchingEnding) {
      newFilePath = path.join(
        moduleDirName,
        hasMatchingEnding.prefix + dataObj.FABRIK_NAME_SLUGIFIED + resultEnding
      );
    } else {
      newFilePath = path.join(moduleDirName, dataObj.FABRIK_NAME_SLUGIFIED + resultEnding);
    }

    if (fs.existsSync(newFilePath)) {
      return helpers.fileSuccess(false, newFilePath);
    }

    if (flags.dryRun) {
      return utility.warningLog(filePath);
    }

    await helpers.write(newFilePath, helpers.replaceTemplateVars(fileContent, dataObj))

    return helpers.fileSuccess(true, newFilePath);
  });

  Promise.all(createFiles).then((results) => {
    if (flags.dryRun) {
      return helpers.moduleCreatedDryRun(moduleSettings.type, dataObj);
    }

    const failedFiles = results.filter(result => !result.success)
    const successfulFiles = results.filter(result => result.success)

    if (failedFiles?.length && successfulFiles?.length) {
      return helpers.partlySuccessful(failedFiles, successfulFiles);
    } else if (failedFiles?.length) {
      return helpers.moduleCreationFailed(failedFiles);
    } else {
      return helpers.moduleCreated(moduleSettings.type, dataObj);
    }
  });
};

module.exports = fabrik;
