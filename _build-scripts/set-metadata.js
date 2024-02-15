const fs = require("fs");

/**
 * Set metadata across multiple files with a single manifest (package.json)
 * @param {Object} param0
 * @param {string} param0.packagePath Path to the main package.json
 * @param {string} param0.appConfPath Path to neutralino.config.json
 */
function setMetadata({ packagePath, appConfPath }) {
  const package = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const { name, prettyName, version } = package;

  const appConf = JSON.parse(fs.readFileSync(appConfPath, "utf8"));
  appConf.applicationId = name;
  appConf.version = version;
  appConf.modes.window.title = prettyName;
  appConf.cli.binaryName = name;

  fs.writeFileSync(appConfPath, JSON.stringify(appConf, null, 2));
  console.log(`Updated ${appConfPath}`);
}

module.exports = setMetadata;
