import { VersionManager } from './VersionManager.js';
import { ModuleLoader } from './ModuleLoader.js';
import { ClientHandler } from './ClientHandler.js';
import neutralinoConfig from './../../../neutralino.config.json' assert { type: 'json' };
import manifest from './data/manifest.json' assert { type: 'json' };

const version = `v${neutralinoConfig.version}`;
console.log(`jamrpc-alpha ${version}`);
const versionManager = new VersionManager({
  repo: 'benjammin4dayz/jamrpc-alpha',
  currentVersion: version,
  userAgent: `jamrpc-alpha/${version}`,
  debug: true,
  // outfile: "./response.json",
});

const modLoader = new ModuleLoader({
  manifest,
  relativeModuleStoragePath: 'modules',
});
const discordRPC = new ClientHandler();

export { modLoader, discordRPC, versionManager };
