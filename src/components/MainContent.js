import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap'
import { approveAllowance, getAllMineData } from '../redux/actions/minerData';

export default function MainContent() {
    const {walletAddress} = useSelector(state => state.wallet)
    const {contractBalance, allowanceVal} = useSelector(state => state.minerData)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(walletAddress){
            dispatch(getAllMineData(walletAddress))
        }
    }, [walletAddress])
    const handleApproval = () => {
        dispatch(approveAllowance(walletAddress))
    }
    return (
        <Container>
            <center>
                <img alt="BNB Miner" src="assets/img/bnbminer1095apr.png" href="index.html" width="100%" height="auto" />
            </center>
            <div className="jumbotron">
                <div className="container-fluid miners-tally-container">
                    <Row>
                        <Col md={12} className="text-center">
                            <h2 className="tally-text">You have <span className="numminers">0</span> Miners</h2>
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
                                <h2><span id="production">0</span></h2>
                                <p className="pphr">feet per hour</p>
                                <p className="mw-250"><br />
                                    <span id="sellsforexample"></span>
                                </p>
                            </div>
                        </Col>
                        <Col md={6} className="nopad-right nopad-lr">
                            <div className="hold-contain-top centerColumn">
                                <img alt="Miners" className="main-img" src="assets/img/minerwithwheelbarrel.png" />
                                <h2>Mined</h2>
                            </div>
                            <div className="hold-contain-bottom centerColumn">
                                <h2><span id="sellprice ">?</span></h2>
                                <p className="pphr">bnb in barrel</p>
                                <p className="mw-250"><br /><span id="timeuntilfull centerColumn">?</span><br />
                                    until barrel is full</p>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Row>
                    <Col md={6} className="nopad-left nopad-lr">
                        <div className="spend-input">
                            <p style={{color:"#354D5F",fontSize:"14px"}}>Enter BNB Amount & Click Hire Below</p>
                            <input className="form-control" id="ethtospend" step="1"
                                type="number" value="1" /> <span className="bnb-text">BNB</span>
                        </div>
                        {
                            allowanceVal ?
                                <a className="btn btn-lg btn-buy"
                                role="button">
                                    Hires <span id="eggstobuy">?</span> Miners
                                </a> :
                                <a className="btn btn-lg btn-buy" onClick={handleApproval}>
                                    Approve
                                </a>
                        }
                    </Col>
                    <Col md={6}>
                            <p>
                                <a className="btn btn-lg btn-hatch w-100"
                                role="button">Hire More Miners</a>
                            </p>
                        <p><a className="btn btn-lg btn-sell w-100"
                                role="button">Pocket Your BNB</a></p>
                    </Col>
                </Row>

                <div className="container altcolor">
                    <br />
                    <Row className="text-center">
                        <p><span id="contractBal">Contract Balance: ?</span></p>
                    </Row>
                    <Row className="text-center">
                        <p><span id="userTrx">Your Balance: ?</span></p>
                    </Row>
                </div>

            </div>
        </Container>
    )
}
