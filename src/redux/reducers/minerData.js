import {SET_CONTRACT_BALANCE, SET_ALLOWANCE} from '../types'

const initialState = {
    contractBalance: 0,
    allowanceVal: 0,
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_CONTRACT_BALANCE:
            return {
                ...state,
                contractBalance: payload
            }
            case SET_ALLOWANCE:
                return {
                    ...state,
                    allowanceVal: payload
                }
        default:
            return state
    }
}