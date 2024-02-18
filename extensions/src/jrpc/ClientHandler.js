import { RPCClient } from 'discord-presence-utils';

class ClientHandler extends RPCClient {
  constructor(clientId = '1199430004510036132') {
    super();
    this.clientId = clientId;
    this.activity = {};
  }

  async connect() {
    await super.connect(this.clientId);
  }

  async disconnect() {
    await super.destroy();
  }
}

export default ClientHandler;
export { ClientHandler };
