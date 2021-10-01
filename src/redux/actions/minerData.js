import { toast } from "react-toastify"
import { formatEggs, formatTrxValue, translateQuantity, secondsToString } from "../../utils"
import { buyEggs, calculateEggBuySimple, calculateEggSell, contractBalance, devFee, enableEPIToken, getMyEggs, getMyMinersFromContract, getTokenAllowance, hatchEggs, sellEggs, userBalance } from "../../utils/contractMethods/wallet"
import { SET_CONTRACT_BALANCE, SET_ALLOWANCE, SET_MY_MINERS, SET_DIGGING_PER_HOUR, SET_SELL_EXAMPLE, SET_SELL_PRICE, SET_SECONDS_UNTIL_FULL, SET_USER_BALANCE, SET_BTN_TXT } from "../types"
import { setLaoding } from "./layout"
import Web3 from "web3"
import BigNumber from "bignumber.js"
const web3 = new Web3(window.ethereum);
var lastNumEggs=-1
const lastNumMiners=-1
const lastSecondsUntilFull=100
const lastHatchTime=0
const eggstohatch1=2592000
var lastUpdate=new Date().getTime()
const modalID=0
const baseNum = '';
const currentAddr = '';


export const getAllMineData = (userAddress) => dispatch => {
    dispatch(getContractBalance())
    dispatch(getUserBalance(userAddress))
    dispatch(getUserAllowance(userAddress))
    dispatch(getMyMiners(userAddress))
    dispatch(updateSellPrice(userAddress))
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
// userBalance
export const getUserBalance = (userAddress) => async dispatch => {
    try {
        let rest = await userBalance(userAddress);
        dispatch({
            type: SET_USER_BALANCE,
            payload: rest
        })
    } catch (error) {
        console.error('%c 🍺 error: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', error);
    }
}
export const getMyMiners = (userAddress) => async dispatch => {
    try {
        let res  = await getMyMinersFromContract(userAddress);
        dispatch({
            type: SET_MY_MINERS,
            payload: translateQuantity(res)
        })
        // SET_DIGGING_PER_HOUR
        dispatch({
            type: SET_DIGGING_PER_HOUR,
            payload: formatEggs(parseFloat(res) * 60 * 60)
        })
        let eggs = await calculateEggBuySimple(0.1);
        let fee = await devFee(eggs);
        
        dispatch({
            type: SET_SELL_EXAMPLE,
            payload: `0.1 Cake Hires ${formatEggs(eggs-fee)} miners`
        })
    } catch (error) {
        console.error('%c 🌮 error: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', error);
    }
}
export const btnEggVal = (amount) => async dispatch => {
    try {
        // amount = new BigNumber(amount).multipliedBy(1e16) 
        let eggs = await calculateEggBuySimple(amount);
        let fee = await devFee(eggs);
        dispatch({
            type: SET_BTN_TXT,
            payload: formatEggs(eggs-fee)
        })
        
    } catch (error) {
        console.error('%c 🍯 error: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', error);
        
    }
}

export const updateSellPrice = (userAddress) => async dispatch => {
    try {
        let eggs = await getMyEggs(userAddress)
        if (eggs > 0) {
            let sum = await calculateEggSell(eggs);
            let fee = await devFee(sum)
            let sellPrice = formatTrxValue(web3.utils.fromWei(sum) - web3.utils.fromWei(fee))
            dispatch({
                type: SET_SELL_PRICE,
                payload: translateQuantity(sellPrice)
            })
        }
        if(lastNumEggs!=eggs){
            lastNumEggs=eggs
            lastUpdate=new Date().getTime()
            // updateEggNumber(eggs/eggstohatch1)//formatEggs(eggs))
        }
        let lastNumMinerss = await getMyMinersFromContract(userAddress)
        let secondsuntilfull=eggstohatch1-eggs/lastNumMinerss
        
        dispatch({
            type: SET_SECONDS_UNTIL_FULL,
            payload: secondsToString(secondsuntilfull)
        })
        
    } catch (error) {
        console.error('%c 🥗 error): ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', error);
        
    }
}
export const secondsUntilFull = (userAddress) => async => {

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


// send functions
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
    try {
        dispatch(setLaoding(true))
        let res = await buyEggs(userAddress, amount)
        dispatch(getAllMineData(userAddress))
        toast.success("Miners hired")
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
        toast.success("More miners hired")
        dispatch(getAllMineData(userAddress))
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
        toast.success("Pocket your cake successful")
        dispatch(getAllMineData(userAddress))
        dispatch(setLaoding(false))
        
    } catch (error) {
        console.error('%c 🦐 error: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', error);
        dispatch(setLaoding(false))
        
    }
}