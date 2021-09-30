import {SET_CONTRACT_BALANCE} from '../types'

const initialState = {
    contractBalance: 0
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_CONTRACT_BALANCE:
            return {
                ...state,
                contractBalance: payload
            }
        default:
            return state
    }
}