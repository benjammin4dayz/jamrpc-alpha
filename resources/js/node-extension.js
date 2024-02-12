// NodeExtension
//
// Run NodeExtension functions by sending dispatched event messages.
//
// (c)2023 Harald Schneider - marketmix.com

class NodeExtension {
    constructor(debug=false) {
        this.version = '1.0.1';
        this.debug = debug;
    }
    /**
     * Wrapper to serve Neutralino extension requests to `neutralino-ext-node`
     * @param {string} f name of a function to trigger (defined by the extension)
     * @param {string | undefined} p parameter to pass into the triggered function. `null` if not defined
     * @returns {Promise<any>}
     */
    async run(f, p=null) {
        let ext = 'extNode';
        let event = 'runNode';

        let data = {
            function: f,
            parameter: p
        }

        if(this.debug) {
            console.log(`EXT_NODE: Calling ${ext}.${event} : ` + JSON.stringify(data));
        }

        await Neutralino.extensions.dispatch(ext, event, data);
    }

    /**
     * @deprecated This may still leave an orphaned Node.js process.
     * While it appears to work on the initial startup and shutdown,
     * subsequent runs do not properly terminate the Node process.
     * (tested on win11)
     * ---
     * #### Fix:
     *  Handle app shutdown by telling the Node backend process
     *  to emit an event declaring that it is shutting down before calling 
     *  `process.exit` on the main thread. This event can be listened to 
     *  by Neutralino to callback `Neutralino.app.exit`.
     * 
     * #### Note to the forgetful:
     *  If you expect the callback to quit your Neutralino app, you should also
     *  define a timeout in the event that the Node process was not available.
     *  Otherwise, the user will encounter a scenario where they click "Exit"
     *  and the application will do nothing.
     */
    async stop() {
        let ext = 'extNode';
        let event = 'appClose';

        if(this.debug) {
            console.log(`EXT_NODE: Calling ${ext}.${event}`);
        }
        await Neutralino.extensions.dispatch(ext, event, "");
        await Neutralino.app.exit();
    }
}