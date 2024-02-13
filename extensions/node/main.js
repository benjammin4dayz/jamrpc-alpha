const NeutralinoExtension = require("./neutralino-extension");
const DEBUG = true;

const { discordRPC, modLoader } = require("./../dist/jrpc-bundle");

function emit(opts) {
  ext.sendMessage(opts.event, opts.message);
}

const ping = (d) => {
  emit({ event: "pingResult", message: `Node says PONG in reply to "${d}"` });
};

const shutdown = () => {
  emit({ event: "nodeShutdown", message: 'Node says: "Goodbye, world!"' });
  process.exit(0);
};

const ENOFN = (d) => {
  emit({
    event: "nodeExtError",
    message: [
      `[Node-Ext] '${d}' is not a recognized function.`,
      "Check the name and ensure that a corresponding function is defined",
    ].join(" "),
  });
};

function processAppEvent(d) {
  // Handle Neutralino app events.
  // :param d: data package as JSON dict.
  // :return: ---

  if (ext.isEvent(d, "runNode")) {
    switch (d.data.function) {
      case "ping":
        return ping(d.data.parameter);
      case "ModuleLoader":
        const p = d.data.parameter;
        if (p === "getModuleStorage") modLoader.getModuleStorage();
        if (p === "refreshModuleStorage") modLoader.refreshModuleStorage();
        return;
      case "setActivity":
        return discordRPC.setActivity(d.data.parameter);
      case "clearActivity":
        return discordRPC.clearActivity();
      case "shutdown":
        discordRPC.destroy();
        return shutdown();
      default:
        return ENOFN(d.data.function);
    }
  }
}

// Activate Extension
//
const ext = new NeutralinoExtension(DEBUG);
console.log("---");
console.log("NodeJS Version:", process.version);
console.log("NodeJS Path:", process.execPath);
console.log("---");
ext.run(processAppEvent);

discordRPC.connect();
