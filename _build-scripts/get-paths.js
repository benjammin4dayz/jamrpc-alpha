const path = require("path");

const baseDir = path.resolve(__dirname, "..");

const packagePath = path.join(baseDir, "package.json");
const appConfPath = path.join(baseDir, "neutralino.config.json");

module.exports = { baseDir, packagePath, appConfPath };
