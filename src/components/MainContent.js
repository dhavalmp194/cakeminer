import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap'
import { approveAllowance, getAllMineData, hireMiners, hireMoreMiners, pocketCake } from '../redux/actions/minerData';

export default function MainContent() {
    const [cakeAmount, setCakeAmount] = useState(1)
    const {walletAddress} = useSelector(state => state.wallet)
    const {allowanceVal, contractBalance, myMiners, diging, sellExample, sellPrice, secondsUntilFull, userBalance} = useSelector(state => state.minerData)
    const dispatch = useDispatch();
    useEffect(() => {
        if(walletAddress){
            dispatch(getAllMineData(walletAddress))
        }
    }, [walletAddress])

    const handleApproval = () => {
        if(!walletAddress){
            toast.error("please Provide a wallet address")
        }else{
            dispatch(approveAllowance(walletAddress))
        }
    }
    // const hireMiners
    const handleHireMiner = () => {
        if(!walletAddress){
            toast.error("please Provide a wallet address")
        } else if(cakeAmount <= 0){
            toast.error("please Provide cake amount.")
        } else {
            dispatch(hireMiners(cakeAmount, walletAddress))
        }
    }
    const handleHireMoreMiner = () => {
        if(!walletAddress){
            toast.error("please Provide a wallet address")
        } else {
            dispatch(hireMoreMiners(walletAddress))
        }
    }
    // pocketCake
    const handlePocketCake = () => {
        if(!walletAddress){
            toast.error("please Provide a wallet address")
        } else {
            dispatch(pocketCake(walletAddress))
        }
    }
    return (
        <Container>
            <center>
                <img alt="Cake Miner" src="assets/img/bnbminer1095apr.png" href="index.html" width="100%" height="auto" />
            </center>
            <div className="jumbotron">
                <div className="container-fluid miners-tally-container">
                    <Row>
                        <Col md={12} className="text-center">
                            <h2 className="tally-text">You have <span className="numminers">{myMiners}</span> Miners</h2>
                        </Col>
                    </Row>
                </div>
                <Container>
                    <Row>
                        <Col md={6} className="nopad-left nopad-lr">
                            <div className="prod-contain-top centerColumn">
                                <img alt="Miners" className="main-img" src="assets/img/minerdigging.png" />
                                <h2>Digging</h2>
                            </div>
                            <div className="prod-contain-bottom centerColumn">
                                <h2><span id="production">{diging}</span></h2>
                                <p className="pphr">feet per hour</p>
                                <p className="mw-250"><br />
                                    <span id="sellsforexample">{sellExample}</span>
                                </p>
                            </div>
                        </Col>
                        <Col md={6} className="nopad-right nopad-lr">
                            <div className="hold-contain-top centerColumn">
                                <img alt="Miners" className="main-img" src="assets/img/minerwithwheelbarrel.png" />
                                <h2>Mined</h2>
                            </div>
                            <div className="hold-contain-bottom centerColumn">
                                <h2><span id="sellprice ">{sellPrice}</span></h2>
                                <p className="pphr">cake in barrel</p>
                                <p className="mw-250"><br /><span id="timeuntilfull centerColumn">{secondsUntilFull}</span><br />
                                    until barrel is full</p>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Row>
                    <Col md={6} className="nopad-left nopad-lr">
                        <div className="spend-input">
                            <p style={{color:"#354D5F",fontSize:"14px"}}>Enter Cake Amount & Click Hire Below</p>
                            <input className="form-control" id="ethtospend" step="1"
                                type="number" value={cakeAmount}  onChange={e => setCakeAmount(e.target.value)} /> <span className="bnb-text">Cake</span>
                        </div>
                        {
                            allowanceVal ?
                                <a className="btn btn-lg btn-buy"
                                role="button" onClick={handleHireMiner}>
                                    Hires <span id="eggstobuy">?</span> Miners
                                </a> :
                                <a className="btn btn-lg btn-buy" onClick={handleApproval}>
                                    Approve
                                </a>
                        }
                    </Col>
                    <Col md={6}>
                            <p>
                                <a 
                                    className="btn btn-lg btn-hatch w-100"
                                    onClick={handleHireMoreMiner}
                                    role="button">
                                        Hire More Miners
                                </a>
                            </p>
                        <p>
                            <a 
                                className="btn btn-lg btn-sell w-100"
                                onClick={handlePocketCake}
                                role="button">
                                    Pocket Your Cake
                            </a>
                        </p>
                    </Col>
                </Row>

                <div className="container altcolor">
                    <br />
                    <Row className="text-center">
                        <p><span id="contractBal">Contract Balance: {contractBalance}</span></p>
                    </Row>
                    <Row className="text-center">
                        <p><span id="userTrx">Your Balance: {userBalance}</span></p>
                    </Row>
                </div>

            </div>
        </Container>
    )
}
