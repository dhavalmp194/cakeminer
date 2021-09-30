import { toast } from "react-toastify"
import { buyEggs, contractBalance, enableEPIToken, getTokenAllowance, hatchEggs, sellEggs } from "../../utils/contractMethods/wallet"
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
        toast.success("Approved successful")
    } catch (error) {
        console.error('%c 🌮 error: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', error);
    }
}

export const hireMiners = (userAddress, amount) => async dispatch => {
    console.log('%c 🍮 userAddress, amount: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', userAddress, amount);
    try {
        dispatch(setLaoding(true))
        let res = await buyEggs(userAddress, amount)
        console.log('%c 🌮 res: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', res);
        toast.success("Miner highered")
        dispatch(setLaoding(false))
        
    } catch (error) {
        console.error('%c 🌯 error: ', 'font-size:20px;background-color: #B03734;color:#fff;', error);
        dispatch(setLaoding(false))
        
    }
}

export const hireMoreMiners = (userAddress) => async dispatch => {
    // hatchEggs
    try {
        dispatch(setLaoding(true))
        let res = await hatchEggs(userAddress)
        console.log('%c 🌮 res: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', res);
        toast.success("More miner hired")
        dispatch(setLaoding(false))
        
    } catch (error) {
        console.error('%c 🥐 error: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', error);
        dispatch(setLaoding(false))
        
    }
}

export const pocketCake = (userAddress) => async dispatch => {
    // sellEggs
    try {
        dispatch(setLaoding(true))
        let res = await sellEggs(userAddress)
        console.log('%c 🌮 res: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', res);
        toast.success("Poket your cake successful")
        dispatch(setLaoding(false))
        
    } catch (error) {
        console.error('%c 🦐 error: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', error);
        dispatch(setLaoding(false))
        
    }
}