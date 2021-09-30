import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { WalletProvider } from 'react-binance-wallet';
import Web3 from 'web3'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function getLibrary(provider) {
  return new Web3(provider)
}

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <App />
        </Provider>
      </Web3ReactProvider>
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
