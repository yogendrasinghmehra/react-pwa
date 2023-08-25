import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


let deferredPrompt; // Allows to show the install prompt
const installButton = document.getElementById("install_button");

window.addEventListener("beforeinstallprompt", e => {
  console.log("beforeinstallprompt fired");
  // Prevent Chrome 76 and earlier from automatically showing a prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
   deferredPrompt = e;
  // Show the install button
  installButton.hidden = false;
  installButton.addEventListener("click", installApp);
});

function installApp() {
  // Show the prompt
  deferredPrompt.prompt();
  installButton.disabled = true;

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === "accepted") {
      console.log("PWA setup accepted");
      installButton.hidden = true;
    } else {
      console.log("PWA setup rejected");
    }
    installButton.disabled = false;
    deferredPrompt = null;
  });
}

window.addEventListener("appinstalled", evt => {
  console.log("appinstalled fired", evt);
});