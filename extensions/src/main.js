import NeutralinoExtension from './neutralino-extension';
import { modLoader, discordRPC, versionManager } from './jrpc';
const DEBUG = true;

/**
 * Handle Neutralino app events.
 * @param {Object} d data package as JSON dict.
 * @param {string} d.event
 * @param {Object} d.data
 * @param {string} d.data.function
 * @param {string} d.data.parameter
 * @returns {*}
 */
function processAppEvent(d) {
  if (this.isEvent(d, 'appClose')) process.exit(0);
  if (!this.isEvent(d, 'runNode')) return;
  switch (d.data.function) {
    case 'PING':
      return this.sendMessage('PONG', 'PONG!');
    case 'discord.setActivity':
      return discordRPC.setActivity(d.data.parameter);
    case 'discord.clearActivity':
      return discordRPC.clearActivity();
    default:
      return this.sendMessage(
        'extNodeError',
        `'${d.data.function}' is not a recognized function.`
      );
  }
}

// Activate Extension
//
const ext = new NeutralinoExtension(DEBUG);
console.log('---');
console.log('NodeJS Version:', process.version);
console.log('NodeJS Path:', process.execPath);
console.log('---');
ext.run(processAppEvent.bind(ext));

discordRPC.connect();
versionManager.onUpdateAvailableCb = function () {
  ext.sendMessage(
    'updateAvailable',
    JSON.stringify({
      current: versionManager.versionCurrent || '',
      available: versionManager.versionAvailable || '',
      downloadUrl: versionManager.downloadUrl || '',
    })
  );
};

export { ext };
