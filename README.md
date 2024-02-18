# JamRPC

This is a lightweight application built on Neutralino and Node.js to manage Discord Rich Presence.

![Preview](./img/preview.png)

## 🚀 Features

- Continuously display custom Discord Rich Presence.
- Hide the window in the system tray.
- Cross-platform (probably™).

#### Planned

- Drop-in RPC modules for select games.
- Drop-in RPC modules for activities (e.g. Birthday countdown)

> [!Warning]  
> **Work in Progress** - features and bugs may appear or disappear at random. Check back often!

## 🧑‍💻 Setup Instructions

### Getting started

Download the [latest release](https://github.com/benjammin4dayz/jamrpc-alpha/releases/latest) and extract it anywhere you prefer.

### Automatic (TLDR)

1.  Start `install.cmd` to download the project's dependencies.

2.  Start the app!

### Manual

<details>

1. #### Get the dependencies.

   Download a Node.js **binary** from [nodejs.org](https://nodejs.org/en/download/)

   - [Windows x64](https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.zip)

2. #### Configure the dependencies

   Move `node.exe` to the app folder and drop it inside `extensions/`.

   > [!NOTE]  
   > `node.exe` MUST be inside the extensions/ folder. Global installs are not supported at this time.

3. #### Start the app!

</details>

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

### Commands

1.  Prepare dependencies

        npm i -g @neutralinojs/neu && npm install

2.  Start the dev server

        npm run start

3.  Build the app

        npm run build

4.  Tidy up afterwards

        npm run clean

---
