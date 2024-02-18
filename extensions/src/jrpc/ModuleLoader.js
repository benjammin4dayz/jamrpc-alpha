// @ts-check
import fs from "fs";
import path from "path";

class Module {
  constructor({ manifest, name, path }) {
    this.manifest = manifest;
    this.name = name;
    this.path = path;
    this.state = {
      isValid: true,
      reason: "",
    };
  }

  validate() {
    try {
      if (!this.name) throw new Error("missing module name");
      if (!this.path) throw new Error("missing module path");
      if (!fs.existsSync(this.path)) throw new Error("invalid module path");
      if (!this.manifest[this.name])
        throw new Error("unsupported or invalid module name");
    } catch (e) {
      this.state.isValid = false;
      this.state.reason = e.message;
    }
    return this.state;
  }
}

class ModuleLoader {
  constructor({ manifest, relativeModuleStoragePath }) {
    this.logger = console;

    this.manifest = manifest;
    this.relativeModuleStoragePath = relativeModuleStoragePath;
    this.moduleStorage = this.getModuleStorage();
    this.logger.log(
      [
        `ModuleLoader initialized:`,
        `${this.moduleStorage.length} module${this.moduleStorage.length === 1 ? "" : "s"} available`,
      ].join(" "),
    );
  }

  refreshModuleStorage() {
    this.moduleStorage = this.getModuleStorage();
    this.logger.log(`refreshed modules (${this.moduleStorage.length} avail.)`);
  }

  getModuleStorage() {
    const moduleStoragePath = path.join(
      // __dirname,
      process.cwd(),
      this.relativeModuleStoragePath,
    );
    if (!fs.existsSync(moduleStoragePath)) fs.mkdirSync(moduleStoragePath);
    // ---
    const [modules, fileNames] = [[], []];
    // @ts-expect-error 2345
    fileNames.push(...fs.readdirSync(moduleStoragePath));
    if (!fileNames.length)
      this.logger.log(`no modules found in '${moduleStoragePath}'`);
    fileNames.forEach((fname) => {
      const module = new Module({
        manifest: this.manifest,
        // @ts-expect-error 2345
        name: fname.replace(/\.[^.]+$/, ""),
        path: path.join(moduleStoragePath, fname),
      });
      // @ts-expect-error 2345
      if (module.validate().isValid) modules.push(module);
      else
        this.logger.warn(
          `refused to add module '${module?.name}' - '${module.validate().reason}'`,
        );
    });
    return modules;
  }

  static get exception() {
    return {
      ENOENT: (moduleDir) =>
        new Error(
          `failed to get or create module storage path (looking for '${moduleDir}')`,
        ),
    };
  }
}

export default ModuleLoader;
export { ModuleLoader };
