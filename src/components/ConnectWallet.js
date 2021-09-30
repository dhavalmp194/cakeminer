import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Container, Row, Col } from 'reactstrap';
import BinanceConnect from './BinanceConnect';
import MetaMaskConnect from './MetaMaskConnect';

export default function ConnectWallet() {
    const [modal, setModal] = useState(false);
    const { walletAddress } = useSelector(state => state.wallet)
    const [walletAddressDisp, setWalletAddressDisp] = useState("")
    const toggle = () => setModal(!modal);
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
                            <BinanceConnect />
                        </Col>
                        <Col lg={12} className="m-2 text-center">
                            <MetaMaskConnect />
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}
