const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '../package.json');
const appConfPath = path.join(__dirname, '../neutralino.config.json');

/**
 * Set metadata across multiple files with a single manifest (package.json)
 * @param {Object} param0
 * @param {string} param0.packagePath Path to the main package.json
 * @param {string} param0.appConfPath Path to neutralino.config.json
 */
function setMetadata(debug = false) {
  if (debug) console.log('Reading package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const { name, prettyName, version } = packageJson;

  if (debug) console.log('Reading neutralino.config.json');
  const appConf = JSON.parse(fs.readFileSync(appConfPath, 'utf8'));
  appConf.applicationId = name;
  appConf.version = version;
  appConf.modes.window.title = prettyName;
  appConf.cli.binaryName = name;

  if (debug) console.log(`Writing to ${appConfPath}`);
  fs.writeFileSync(appConfPath, JSON.stringify(appConf, null, 2));
}

module.exports = setMetadata;
