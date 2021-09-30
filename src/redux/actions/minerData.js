import { contractBalance, enableEPIToken, getTokenAllowance } from "../../utils/contractMethods/wallet"
import { SET_CONTRACT_BALANCE, SET_ALLOWANCE } from "../types"
import { setLaoding } from "./layout"

export const getAllMineData = (userAddress) => dispatch => {
    dispatch(getContractBalance())
    dispatch(getUserAllowance(userAddress))
    
}

export const getContractBalance = () => async dispatch => {
    try {
        let rest = await contractBalance();
        dispatch({
            type: SET_CONTRACT_BALANCE,
            payload: rest
        })
    } catch (error) {
        console.error('%c 🍺 error: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', error);
    }
}

export const getUserAllowance = (userAddress) => async dispatch => {
    try {
        let res = await getTokenAllowance(userAddress)
        dispatch({
            type:SET_ALLOWANCE,
            payload: res
        })
        
    } catch (error) {
        console.error('%c 🍍 error: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', error);
        
    }
}
export const approveAllowance = userAddress => async dispatch =>{
    try {
        dispatch(setLaoding(true))
        let res  = await enableEPIToken(userAddress);
        dispatch(getUserAllowance(userAddress))
        dispatch(setLaoding(false))
    } catch (error) {
        console.error('%c 🌮 error: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', error);
    }
}