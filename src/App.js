import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let installPrompt = null;
  let buttonInstall;
  React.useEffect(() => {
    buttonInstall = document.getElementById('install');

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      console.log("Install Prompt fired");
      installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true) {
        console.log('already installed');
        return false;
      }

      buttonInstall.style.display = 'block'
      buttonInstall.scrollIntoView()
    });

    window.addEventListener('appinstalled', e => {
      console.log('app installed');
    });

  }, []);

  function handleClick() {
    installPrompt.prompt();
    installPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('user accepted');
      } else {
        console.log('user rejected');
      }
      installPrompt = null;
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button id="install" onClick={handleClick}>Instalar App</button>
      </header>
    </div>
  );
}

export default App;
