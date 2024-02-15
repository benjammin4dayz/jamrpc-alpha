import { VersionManager } from "./VersionManager.js";
import { ModuleLoader } from "./ModuleLoader.js";
import { ClientHandler } from "./ClientHandler.js";
import manifest from "./data/manifest.json" assert { type: "json" };

const versionManager = new VersionManager({
  repo: "benjammin4dayz/jamrpc-alpha",
  currentVersion: "v0.2.0",
  userAgent: "jamrpc-alpha/v0.2.0",
  debug: true,
  // outfile: "./response.json",
});

const modLoader = new ModuleLoader({
  manifest,
  relativeModuleStoragePath: "modules",
});
const discordRPC = new ClientHandler();

export { modLoader, discordRPC, versionManager };
