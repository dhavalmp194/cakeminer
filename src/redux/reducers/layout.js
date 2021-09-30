import {SET_LOADER} from '../types'

const initialState = {
    loading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}