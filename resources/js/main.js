// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library

function showInfo() {
  document.getElementById("info").innerHTML = `
        ${NL_APPID} is running on port ${NL_PORT}  inside ${NL_OS}
        <br/><br/>
        <span>server: v${NL_VERSION} . client: v${NL_CVERSION}</span>
        `;
}

function setTray() {
  if (NL_MODE != "window") return;
  Neutralino.os.setTray({
    icon: "/resources/icons/trayIcon.png",
    menuItems: [
      { id: "VERSION", text: "Get version" },
      { id: "SEP", text: "-" },
      { id: "QUIT", text: "Quit" },
    ],
  });
}

function onTrayMenuItemClicked(event) {
  switch (event.detail.id) {
    case "VERSION":
      Neutralino.os.showMessageBox(
        "Version information",
        `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`,
      );
      break;
    case "QUIT":
      appShutdown();
      break;
  }
}

function appShutdown() {
  const QUIT = () => Neutralino.app.exit();
  Neutralino.events.on("nodeShutdown", QUIT);
  NODE.run("shutdown");
  setTimeout(QUIT, 500);
}

async function onPingResult(e) {
  console.log("DBG RECEIVED: " + e.detail);

  let msg = document.getElementById("msg");
  msg.innerHTML += e.detail + "<br>";
}

// ---
Neutralino.init();

Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", appShutdown);
Neutralino.events.on("pingResult", onPingResult);
Neutralino.events.on("nodeExtError", (e) => console.warn(e.detail));

if (NL_OS != "Darwin") setTray(); // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615

showInfo();

const NODE = new NodeExtension(true);
