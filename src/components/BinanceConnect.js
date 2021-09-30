import React, { useEffect } from 'react'
import {useWallet} from 'react-binance-wallet'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { setBinanceWalletAdress, setBinanceWalletDisconnected, setWalletType } from '../redux/actions/wallet'

export default function BinanceConnect() {
    const dispatch = useDispatch()
    const { account, connect, reset, status, error, balance, chainId } = useWallet()
    const { walletAddress, binanceWalletDisconnected, walletType } = useSelector(state => state.wallet)
    
    useEffect(() => {
        setTimeout(()=> {
            if(!binanceWalletDisconnected && walletType === "binance"){
                dispatch(setBinanceWalletDisconnected(false))
                dispatch(setWalletType("binance"))
                connect('bsc')
            }
        }, 1500)
    }, [])
    
    useEffect(() => {
        dispatch(setBinanceWalletAdress(account))
    }, [account])

    const connectBinanceWallet = () => {
        dispatch(setBinanceWalletDisconnected(false))
        dispatch(setWalletType("binance"))        
        connect('bsc');
    }
    
    const disconnectBinanceWallet = () => {
        reset(); 
        dispatch(setWalletType(""))
        dispatch(setBinanceWalletDisconnected(true))
    }

    return (
        <div>
            {(walletType === "" || walletType === "binance") ? 
            
                    status === 'disconnected' ? (
                        <>
                            <Button 
                                className="binanceBtn"
                                onClick={connectBinanceWallet}>
                                    Connect Binance Chain Wallet
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="danger"  onClick={disconnectBinanceWallet}>
                                Disconnect
                            </Button>
                            {
                                walletAddress && 
                                <>
                                    <p className="mt-2">Connected as Binance Wallet</p>
                                    <p><b>{walletAddress}</b></p>
                                </>
                                
                            }
                        </>
                        
                    )
                : null
            }
        </div>
    )
}
