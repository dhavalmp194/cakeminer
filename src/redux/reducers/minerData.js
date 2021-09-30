import {SET_CONTRACT_BALANCE, SET_ALLOWANCE, SET_MY_MINERS, SET_DIGGING_PER_HOUR, SET_SELL_EXAMPLE, SET_SELL_PRICE, SET_SECONDS_UNTIL_FULL, SET_USER_BALANCE} from '../types'

const initialState = {
    allowanceVal: 0,
    contractBalance: 0,
    userBalance: 0,
    myMiners:0,
    diging: 0,
    sellExample: "",
    sellPrice: 0,
    secondsUntilFull: 0
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_CONTRACT_BALANCE:
            return {
                ...state,
                contractBalance: payload
            }
        case SET_USER_BALANCE:
            return {
              ...state,
              userBalance: payload  
            }
        case SET_ALLOWANCE:
            return {
                ...state,
                allowanceVal: payload
            }
        case SET_MY_MINERS:
            return {
                ...state,
                myMiners: payload
            }
        case SET_DIGGING_PER_HOUR:
            return {
                ...state,
                diging: payload
            }
        case SET_SELL_EXAMPLE:
            return {
                ...state,
                sellExample: payload
            }
        case SET_SELL_PRICE:
            return {
                ...state,
                sellPrice: payload
            }
        case SET_SECONDS_UNTIL_FULL:
            return {
                ...state,
                secondsUntilFull: payload
            }
        default:
            return state
    }
}