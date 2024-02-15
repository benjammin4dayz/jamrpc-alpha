# JamRPC

This is a lightweight application built on Neutralino and Node.js to manage Discord Rich Presence.

## 🚀 Features

- Set custom Discord Rich Presence
- Toggleable GUI (Graphical User Interface)
- Continuously display presence.
- System tray icon per O.S.
- Can run in background.
- Cross-platform (probably™).

#### Planned

- Drop-in RPC modules for select games.

> [!Warning]  
> **Work in Progress** - features and bugs may appear or disappear at random. Check back often!

## 🧑‍💻 Setup Instructions

### Getting started

Download the [latest release](https://github.com/benjammin4dayz/jamrpc-alpha/releases/latest) and extract it anywhere you prefer.

### Automatic (TLDR)

1.  Start `install.cmd` to download the project's dependencies.

2.  Open the app!

### Manual

<details>

1. #### Get the dependencies.

   Download a Node.js **binary** from [nodejs.org](https://nodejs.org/en/download/)

   - [Windows x64](https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.zip)

2. #### Configure the dependencies

   Move `node.exe` to the app folder and nest it inside `extensions/node/_runtime`.

   > [!NOTE]  
   > `node.exe` MUST be inside the \_runtime folder. Global installs are not supported at this time.

3. #### Start the app!

</details>

> [!TIP]
> You can test the backend by clicking "Send PING to NodeJS"
>
> If you aren't getting a response, ensure that `node.exe` has been placed inside the `extensions/node/_runtime` folder and then close and restart the app.

## Acknowledgements

| Name             | Reason                                                  | Links                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Discord          | This project wouldn't exist without it                  | <a href="https://discord.gg/" title="App Website"><img alt="Website Icon" src="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-logo-png-transparent-background-background-15.png" style="width: 32px; height: 32px;"></img></a>                                                                                                                                                                                                                                                                                                   |
| Neutralino.js    | A delightfully **tiny** framework for building web apps | <a href="https://neutralino.js.org/" title="Project Website"><img alt="Website Icon" src="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-logo-png-transparent-background-background-15.png" style="width: 32px; height: 32px;"></img></a> <a href="https://github.com/neutralinojs/neutralinojs" title="Project Source"><img alt="GitHub Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/800px-GitHub_Invertocat_Logo.svg.png" style="width: 32px; height: 32px;"></img></a>     |
| Harald Schneider | Node IPC (backend) extension for Neutralino             | <a href="https://marketmix.com" title="Developer Website"><img alt="Website Icon" src="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-logo-png-transparent-background-background-15.png" style="width: 32px; height: 32px;"></img></a> <a href="https://github.com/hschneider/neutralino-ext-node" title="Extension Source"><img alt="GitHub Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/800px-GitHub_Invertocat_Logo.svg.png" style="width: 32px; height: 32px;"></img></a> |

---

### Notes

<details>
<summary>Development</summary>

### Requirements:

[Node.js v20+](https://nodejs.org)

[@neutralinojs/neu](https://www.npmjs.com/package/@neutralinojs/neu)

### Commands

1.  Prepare dependencies

        npm i -g @neutralinojs/neu && npm run prep

2.  Build the app

        npm run build

3.  Tidy up afterwards

        npm run clean

The build process will output some `cmd/batch` scripts, which can be used to fetch a suitable Node.js executable and purge cached app data from the user's system respectively.

---

</details>

<details>
<summary>Add a function</summary>

1. Define a backend Node.js function

   ```js
   const foo = () => console.log("bar");
   ```

   > [!TIP]
   > Send an optional message during execution with `NeutralinoExtension.sendMessage`

2. Handle the conditional logic within [processAppEvent](./extensions/node/main.js)

   ```js
   function processAppEvent(d) {
     if (ext.isEvent(d, "runNode")) {
       if (d.data.function === "foo") foo();
     }
   }
   ```

3. Invoke the Node.js functions from [Neutralino's front-end](./resources/js/main.js)

   ```js
   const NODE = new NodeExtension(true);
   NODE.run("foo");
   ```

   ***

</details>

<details>
<summary>Spaghetti</summary>

I know it's bad. I'm looking into solutions to keep things manageable.

...but _it works_ for now

</details>
