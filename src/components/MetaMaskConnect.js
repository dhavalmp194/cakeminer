import React, { useEffect } from 'react'
import { useWeb3React } from "@web3-react/core"
import { injected } from "../utils/connectors"
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { setMetamaskWalletAdress, setMetamaskWalletDisconnected, setWalletType } from '../redux/actions/wallet';

export default function MetaMaskConnect() {
    const dispatch = useDispatch();
    const { active, account, library, connector, chainId, activate, deactivate } = useWeb3React()
    const { walletAddress, metamaskWalletDisconnected, walletType } = useSelector(state => state.wallet)
    
    useEffect(() => {
        setTimeout(()=> {
            if(!metamaskWalletDisconnected && walletType === "metamask"){
                dispatch(setMetamaskWalletDisconnected(false))
                dispatch(setWalletType("metamask"))
                activate(injected)
            }
        }, 1000)
    }, [])

    useEffect(() => {
        dispatch(setMetamaskWalletAdress(account))
    }, [account])

    async function connect() {
        try {
            dispatch(setMetamaskWalletDisconnected(false))
            dispatch(setWalletType("metamask"))    
            await activate(injected)
        } catch (ex) {
        console.log(ex)
        }
    }

    async function disconnect() {
        try {
            dispatch(setMetamaskWalletDisconnected(true))
            dispatch(setWalletType(""))
            deactivate()
        } catch (ex) {
        console.log(ex)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center">
            {   (walletType === "" || walletType === "metamask") ? 
                    active ?
                        <>
                            <Button color="danger" onClick={disconnect} className="">Disconnect</Button>
                            <p className="mt-2">Connected with Metamask Wallet</p>
                            <p><b>{walletAddress}</b></p> 
                        </> 
                    : <>
                        <Button onClick={connect} className="metamaskBtn">
                            Connect to MetaMask
                        </Button> 
                    </>
                :null
            }
        </div>
    )
}
