# Tiny Neutralino Apps!

### Synopsis

Add a function

1. Define a backend Node.js function

   ```js
   const foo = () => console.log("bar");
   ```

   - Send an optional message during the execution of this with `NeutralinoExtension.sendMessage`

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

---

### Control Flow

1. [`NodeExtension`](./resources/js/node-extension.js) is instantiated in [Neutralino's main.js](./resources/js/main.js)

2. `NodeExtension.run` is called when the button is clicked in [Neutralino's DOM](./resources/index.html)

   - `NodeExtension.run` is an extension wrapper for for `Neutralino.extensions.dispatch`

3. Neutralino serves the dispatch request to the [extension's main.js](./extensions/node/main.js)

   - The wrapper in the previous step provides the extension name, `extNode`, the event which causes node to fire, `runNode`, and a callback.

4. [The extension](./extensions/node/main.js)
   checks if the dispatched event matches the event data signature before checking for a matching function to call.

---

### Refactored words

1. I define a function `shutdown` inside [`extensions/node/main.js`](extensions/node/main.js)

2. I add conditional logic to trigger the `shutdown` function inside [`extensions/node/main.js`](extensions/node/main.js)#processAppEvent

3. I instantiate the `NodeExtension` class inside [`resources/js/main.js`](./resources/js/main.js)

4. I call `NodeExtension.run('shutdown')` which wraps a dispatch call to the Neutralino extension

5. The extension emits an event which can be listened to

```js
function onWindowClose() {
  NODE.run("shutdown");
  Neutralino.events.on("nodeShutdown", () => Neutralino.app.exit());
}
```

# Extensions

- [neutralino-ext-node](https://github.com/hschneider/neutralino-ext-node)

---

---

---

---

---

# neutralinojs-minimal

The default template for a Neutralinojs app. It's possible to use your favorite frontend framework by using [these steps](https://neutralino.js.org/docs/getting-started/using-frontend-libraries).

## Contributors

[![Contributors](https://contrib.rocks/image?repo=neutralinojs/neutralinojs-minimal)](https://github.com/neutralinojs/neutralinojs-minimal/graphs/contributors)

## License

[MIT](LICENSE)

## Icon credits

- `trayIcon.png` - Made by [Freepik](https://www.freepik.com) and downloaded from [Flaticon](https://www.flaticon.com)
