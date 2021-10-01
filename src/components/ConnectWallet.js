import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Container, Row, Col } from 'reactstrap';
import BinanceConnect from './BinanceConnect';
import MetaMaskConnect from './MetaMaskConnect';
import { useWeb3React } from "@web3-react/core";
import {useWallet} from 'react-binance-wallet';
import { injected } from "../utils/connectors"

import { setBinanceWalletAdress, setBinanceWalletDisconnected, setMetamaskWalletAdress, setMetamaskWalletDisconnected, setWalletType } from '../redux/actions/wallet';
import { toast } from 'react-toastify';


export default function ConnectWallet() {
    const dispatch = useDispatch()
    // local state
    const [modal, setModal] = useState(false);
    const [walletAddressDisp, setWalletAddressDisp] = useState("")
    
    // redux state 
    const { walletAddress, metamaskWalletDisconnected, binanceWalletDisconnected, walletType } = useSelector(state => state.wallet)
    // wallet connections
    const { active, account:metamaskAccount, activate, deactivate, chainId:metamaskChainId } = useWeb3React()
    const { account:binanceAccount, connect, reset, status, chainId:binanceChainId } = useWallet()
    
    const toggle = () => setModal(!modal);

    useEffect(() => {
        if(!metamaskWalletDisconnected && walletType === "metamask"){
            dispatch(setMetamaskWalletDisconnected(false))
            dispatch(setWalletType("metamask"))
            activate(injected)
        }
        setTimeout(()=> {
            if(!binanceWalletDisconnected && walletType === "binance"){
                dispatch(setBinanceWalletDisconnected(false))
                dispatch(setWalletType("binance"))
                connect('bsc')
            }
        }, 1000)
    }, [])

    useEffect(() => {
        let env = process.env.REACT_APP_enviorment || "prod";
        if(env === "prod"){
            if(metamaskAccount){
                if(metamaskChainId === 56){
                    dispatch(setMetamaskWalletAdress(metamaskAccount))
                } else {
                    toast.error("Please connect to smart chain network.")
                }
            }
        } else {
            dispatch(setMetamaskWalletAdress(metamaskAccount))
        }
    }, [metamaskAccount])

    useEffect(() => {
        dispatch(setBinanceWalletAdress(binanceAccount))
    }, [binanceAccount])
    
    useEffect(() => {
        if(walletAddress){
            let disp = `${walletAddress.slice(0,8)}...${walletAddress.slice(-4)}`
            setWalletAddressDisp(disp)
        }
        return () => {
            setWalletAddressDisp("")
        }
    }, [walletAddress])

    return (
        <div className="social-pad">
            {
                (walletAddressDisp && walletAddress) ? 
                <a className="m-0 w-100" onClick={toggle}>{walletAddressDisp}</a>
                : 
                <>
                    <a className="m-0 w-100" onClick={toggle}>Connect Wallet</a>
                </>
            }
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Connect Wallet</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg={12} className="m-2 text-center">
                            <BinanceConnect account={binanceAccount} connect={connect} reset={reset} status={status} chainId={binanceChainId}/>
                        </Col>
                        <Col lg={12} className="m-2 text-center">
                            <MetaMaskConnect active={active} account={metamaskAccount} activate={activate} deactivate={deactivate} chainId={metamaskChainId} />
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}
