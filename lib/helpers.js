const fs = require("fs");
const path = require("path");

const glob = require("glob");
const utility = require("./utility");

module.exports.build = (module, baseTemplatePath) => {
  const modulePath = path.join(baseTemplatePath, module.type);
  const globEnding = module.fileTypes.length > 1 ? `/*.{${module.fileTypes.join(",")}}` : `/*.${module.fileTypes.join(",")}`
  const moduleFilesGlob = modulePath + globEnding;

  return new Promise((resolve, reject) => {
    glob(moduleFilesGlob, (err, filesPath) => {
      if (err) {
        errorLog(err);
        return reject(err);
      }

      resolve({
        filesPath: filesPath,
        outputPath: module.output
      });
    });
  });
};

module.exports.read = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        errorLog(err);

        return reject(err);
      }

      resolve(data);
    });
  });
};

module.exports.write = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err, data) => {
      if (err) {
        errorLog(err);

        return reject(err);
      }

      resolve(data);
    });
  });
};

module.exports.fileSuccess = (success, filePath) => {
  return new Promise((resolve, reject) => {
    resolve({
      success,
      filePath
    })
  })
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp('\\b' + find + '\\b', 'g'), replace);
}

module.exports.replaceTemplateVars = (templateString, varObj) => {
  let newTempalteString = templateString;

  for (const key in varObj) {
    if (varObj.hasOwnProperty(key)) {
      newTempalteString = replaceAll(newTempalteString, key, varObj[key]);
    }
  }

  return newTempalteString;
}

module.exports.capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports.slugify = text => {
  return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

module.exports.moduleExists = path => {
  utility.errorLog("The module with that name already exists");
  utility.errorLog("Please select another one");
  utility.lineBreakLog();
  utility.warningLog("FolderPath", true);
  utility.warningLog(path);
};

module.exports.fileExsists = path => {
  utility.errorLog("A file with this name do already exist");
  utility.errorLog("Please select another one");
  utility.lineBreakLog();
  utility.warningLog("Filepath", true);
  utility.warningLog(path);
};

module.exports.moduleCreated = (type, dataObj) => {
  utility.successLog("The new module has been created");
  utility.successLog(`type: ${type}`, true);
  utility.successLog(`name: ${dataObj.FABRIK_NAME_SLUGIFIED}`, true);
  utility.lineBreakLog();
};

module.exports.moduleCreatedDryRun = (type, dataObj) => {
  utility.warningLog(
    "This was a dryRun and the above file(s) would be created if you remove the --dryRun flag"
  );
  utility.warningLog(`type: ${type}`, true);
  utility.warningLog(`name: ${dataObj.FABRIK_NAME_SLUGIFIED}`, true);
  utility.lineBreakLog();
};

module.exports.missingArguments = () => {
  utility.errorLog("You need to give the module a name and a type");
  utility.warningLog("fabrik NAME --t TYPE");
  utility.warningLog(
    "types are defined in fabrik.config.js in your project root"
  );
};

module.exports.missingConfig = () => {
  utility.errorLog("Your missing fabrik.config.js in the root of your project");
};

module.exports.missingModuleConfig = () => {
  utility.errorLog("You need to configure modules in your fabrik.config.js");
};

module.exports.moduleCreationFailed = (failedFiles) => {
  utility.warningLog(`This module creation failed`, true);
  utility.warningLog(`File(s) already exist, here are the failed file path(s):`, true);
  failedFiles.forEach(item => {
    utility.errorLog(item.filePath);
  });
}

module.exports.partlySuccessful = (failedFiles, successfulFiles) => {
  utility.warningLog(`Only some of the file(s) where created:`, true);
  successfulFiles.forEach(item => {
    utility.successLog(item.filePath);
  });
  utility.breakLog();
  utility.warningLog(`Some file(s) failed to be created this is due the the file(s) already exists:`, true);
  utility.warningLog(`Here are the failed ones:`, true);
  failedFiles.forEach(item => {
    utility.errorLog(item.filePath);
  });
}

module.exports.missingTemplates = (directory, fileTypes, templatesFound) => {
  utility.errorLog("Your missing some template file(s)");
  utility.breakLog();
  utility.errorLog(
    "Here is the expected folder for the templates to be in: ",
    true
  );
  utility.errorLog(directory);
  utility.breakLog();
  utility.errorLog("Here is the expected file types: ", true);
  fileTypes.forEach(fileType => {
    utility.errorLog(fileType);
  });
  utility.breakLog();
  utility.errorLog("Here is the templates we found: ", true);
  templatesFound.forEach(templateUrl => {
    utility.errorLog(templateUrl);
  });
};
