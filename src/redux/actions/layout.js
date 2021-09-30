import {SET_LOADER} from '../types'

export const setLaoding = loading => dispatch =>{
    dispatch({
        type: SET_LOADER,
        payload: loading
    })
}