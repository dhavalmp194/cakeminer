import {SET_WALLET, SET_BINANCE_DISCONNECTED, SET_METAMASK_DISCONNECTED, SET_WALLET_TYPE} from '../../types'

const initialState = {
    walletType: "",
    walletAddress: "",
    binanceWalletDisconnected: false,
    metamaskWalletDisconnected: false
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_WALLET:
            return {
                ...state,
                walletAddress: payload
            }
        case SET_BINANCE_DISCONNECTED:
            return {
                ...state,
                binanceWalletDisconnected: payload
            }
        case SET_METAMASK_DISCONNECTED:
            return {
                ...state,
                metamaskWalletDisconnected: payload
            }
        case SET_WALLET_TYPE:
            return {
                ...state,
                walletType: payload
            }
        default:
            return state
    }
}