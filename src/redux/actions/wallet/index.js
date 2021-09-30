import {SET_WALLET, SET_BINANCE_DISCONNECTED, SET_METAMASK_DISCONNECTED, SET_WALLET_TYPE} from '../../types'

export const setBinanceWalletAdress = (address) => dispatch => {
  dispatch({
    type: SET_WALLET,
    payload: address
  })
}

export const setBinanceWalletDisconnected = (connector) => dispatch => {
  dispatch({
    type: SET_BINANCE_DISCONNECTED,
    payload: connector
  })
}

export const setMetamaskWalletAdress = (address) => dispatch => {
  dispatch({
    type: SET_WALLET,
    payload: address
  })
}

export const setMetamaskWalletDisconnected = (connector) => dispatch => {
  dispatch({
    type: SET_METAMASK_DISCONNECTED,
    payload: connector
  })
}

export const setWalletType = (wallet) => dispatch => {
  dispatch({
    type: SET_WALLET_TYPE,
    payload: wallet
  })
}
