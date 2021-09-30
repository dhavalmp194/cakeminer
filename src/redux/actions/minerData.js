import { contractBalance } from "../../utils/contractMethods/wallet"
import { SET_CONTRACT_BALANCE } from "../types"

export const getAllMineData = () => dispatch => {
    dispatch(getContractBalance())
}

export const getContractBalance = () => async dispatch => {
    try {
        let rest = await contractBalance();
        dispatch({
            type: SET_CONTRACT_BALANCE,
            payload: rest
        })
    } catch (error) {
        
    }
}