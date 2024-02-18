import * as Neutralino from '@neutralinojs/lib';

/**
 * Extension event dispatch wrapper
 * @property {function} run Send the `runNode` signal to the Node extension with a payload
 * @property {function} stop Send the `appClose` signal to the Node extension
 */
const NODE = {
  /**
   * @param {string} f - function name
   * @param {string} p - parameter string
   * @returns
   */
  run: async (f, p = null) =>
    await Neutralino.extensions.dispatch('extNode', 'runNode', {
      function: f,
      parameter: p,
    }),
  stop: async () =>
    await Neutralino.extensions.dispatch('extNode', 'appClose', ''),
};

/**
 * Shut down the application and all connected extensions
 */
async function appShutdown() {
  const stats = await Neutralino.extensions.getStats();
  if (stats.connected.includes('extNode')) {
    await Neutralino.extensions.dispatch('extNode', 'appClose', '');
  }
  Neutralino.app.exit();
}

async function setTray() {
  // This is a neutralino global
  if (window?.NL_MODE != 'window') return;

  const tray = {
    icon: '/react-src/public/logo192.png',
    menuItems: [
      { id: 'vanityLabel', text: "Jam's Presence Manager", isDisabled: true },
      { text: '-' },
      { id: 'toggleWindow', text: 'Toggle Window' },
      { text: '-' },
      { id: 'Quit', text: 'Quit' },
    ],
  };

  await Neutralino.os.setTray(tray);
}
let isWindowVisible = true;
function onTrayMenuItemClicked(e) {
  switch (e.detail.id) {
    case 'toggleWindow':
      if (isWindowVisible) {
        Neutralino.window.hide();
        isWindowVisible = false;
      } else {
        Neutralino.window.show();
        isWindowVisible = true;
      }
      break;
    case 'Quit':
      appShutdown();
      break;
  }
}

/**
 * Register listeners for events in the Neutralino app
 * @param {Object} param0
 * @param {function} param0.onWindowClose
 */
function registerListeners({ onWindowClose = () => {} }) {
  Neutralino.events.on('PONG', (d) => console.log(d?.detail));
  Neutralino.events.on('extNodeError', (d) => console.error(d?.detail));
  Neutralino.events.on('windowClose', onWindowClose);
  Neutralino.events.on('trayMenuItemClicked', onTrayMenuItemClicked);
}

function dependencyCheck(dir = './extensions') {
  Neutralino.filesystem
    .readDirectory(dir)
    .then((items) => {
      console.log(items);
      let hasDeps = false;
      for (const { entry, type } of items) {
        if (type === 'DIRECTORY') continue;
        if (entry.includes('node')) hasDeps = true;
      }
      if (!hasDeps) {
        Neutralino.os.showMessageBox(
          'Missing Node.js',
          'Some features may not work properly.',
          'OK',
          'WARNING'
        );
      }
      return hasDeps;
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Entry point for Neutralino functionality
 * @returns {boolean} Boolean indicating if Neutralino was initialized
 */
function main() {
  let isNeutralinoInitialized = false;

  try {
    Neutralino.init();
    isNeutralinoInitialized = true;
  } catch (e) {
    console.warn('Neutralino is inoperable.\n\n', e.message);
  }

  if (isNeutralinoInitialized) {
    registerListeners({ onWindowClose: appShutdown });
    dependencyCheck('./extensions');
    setTray();
  } else {
    console.warn(
      'Skipping dependency check because Neutralino is not initialized'
    );
  }

  return isNeutralinoInitialized;
}

export default main;
export { main as neutralinoMain, NODE };
