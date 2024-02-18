import React from 'react';
import { NODE } from './neutralino.main.js';
import logo from './logo.svg';
import './styles/App.css';

import PresenceInput from './components/PresenceInput.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <h1>JamRPC</h1>
          <p>now featuring React!</p>
        </div>
      </header>
      <PresenceInput
        style={{
          margin: '5vmin',
          maxWidth: '600px',
        }}
        setDiscordPresence={(d) => {
          NODE.run('discord.setActivity', d);
        }}
        unsetDiscordPresence={() => {
          NODE.run('discord.clearActivity');
        }}
        onCancel={() => {
          console.log('Cancelled!');
        }}
        persistentVals={{
          details: 'Powered by Neutralino',
          state: 'now featuring React!',
          largeImageKey:
            'https://avatars.githubusercontent.com/u/36976817?s=200&v=4',
          largeImageText: 'Neutralino',
          smallImageKey:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
          smallImageText: 'React',
          buttonLabelA: 'Try the App!',
          buttonUrlA: 'https://github.com/benjammin4dayz/jamrpc-alpha',
        }}
      />
    </div>
  );
}

export default App;
