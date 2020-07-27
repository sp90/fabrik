const chalk = require("chalk");

module.exports.errorLog = (message, bold) => {
  if (bold) {
    return console.log(chalk.red.bold(message));
  }

  console.log(chalk.red(message));
};

module.exports.warningLog = (message, bold) => {
  if (bold) {
    return console.log(chalk.yellow.bold(message));
  }

  console.log(chalk.yellow(message));
};

module.exports.successLog = (message, bold) => {
  if (bold) {
    return console.log(chalk.green.bold(message));
  }

  console.log(chalk.green(message));
};

module.exports.lineBreakLog = () => {
  console.log("-------------------------------");
};

module.exports.breakLog = () => {
  console.log(" ");
};
