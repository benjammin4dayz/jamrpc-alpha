import { VersionManager } from "./VersionManager.js";
import { ModuleLoader } from "./ModuleLoader.js";
import { ClientHandler } from "./ClientHandler.js";
import manifest from "./data/manifest.json" assert { type: "json" };

const versionManager = new VersionManager({
  repo: "benjammin4dayz/discord-presence-utils",
  userAgent: "jrpc-beta/v0.1.0)",
  debug: true,
  // outfile: "./response.json",
});

const modLoader = new ModuleLoader({
  manifest,
  relativeModuleStoragePath: "modules",
});
const discordRPC = new ClientHandler();

export { modLoader, discordRPC, versionManager };
