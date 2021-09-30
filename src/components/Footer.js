import React from 'react'
import { Col, Row } from 'reactstrap'

export default function Footer() {
    return (
        <footer className="footer">
				<Row>
					<Col lg={6}>
						<h4><u>Sustainability</u></h4>
						    <p>
                                Unlike it's predecessors which paid 100% daily, causing instant and massive inflation.
							    BNB Miner pays a modest 3% daily, allowing investors to rest easy knowing that their
							    investments have unlimited growth potential and a maximum, improbable risk of less than
							    3%.
                            </p>

							<h4><u>Verified Public Contract</u></h4>
							<p>The BNB Miner contract is public, verified and can be viewed here on <a
									href="https://bscscan.com/address/0xce93f9827813761665ce348e33768cb1875a9704"
									target="_blank"><u>BSCScan</u></a>.
							</p>


					</Col>
					<Col lg={6}>
						<h4><u>Miner Info</u></h4>
						<p>BNB Miner pays 3% daily, according to the current mining efficiency rate. The mining
							efficiency rate rises and falls as you and other players hire miners, compound earnings
							and pocket BNB. </p>
						<p>The object of the game is hiring more miners, sooner and more often than other players.
							This in turn earns you more BNB faster. Hiring more miners using your daily BNB earnings
							will 3x your miners within 30 days or less.</p>

					</Col>

					<Col lg={12}>
						<center>
							<p><span><a href="instructions.html" target="_blank"><img alt="How To Start Mining"
											src="assets/img/quesionmarkguy.png" width="15%" height="auto" /><b>How To
											Start Mining</b></a></span></p>
						</center>
					</Col>
					<div className="">
						<Col md={12}>
							<font style={{fontSize:"14px"}}>
								<center>
									<p>Share your BNB Miner referral link, our contract pays you a <b>10%</b>
										referral fee when anyone uses your link to hire miners: <a
											id="playerreflink" onclick="copyRef()">?
											<p></p>
                                            <input id="copytextthing" style={{display:"none"}} type="text"
												value="Hello Worldfdgerh" /></a></p>
								</center>
							</font>
						</Col>
						<center>
							<ul className="nav navbar-nav navbar-right font-weight-normal" style={{float:"right"}}>
								<li><a className="social-pad" href="https://t.me/bnbminer" target="_blank">
                                    <img
											alt="Telegram" className="social-icons"
											src="assets/img/social-icons/telegram.svg" /><span
											className="hide-mobile">Telegram</span></a></li>
								<li><a className="social-pad" href="https://twitter.com/Da_Developer"
										target="_blank"><img alt="Twitter" className="social-icons"
											src="assets/img/social-icons/Twitter-Logo.png" /><span
											className="hide-mobile">Twitter</span></a></li>
								<li><a className="social-pad"
										href="https://bscscan.com/address/0xce93f9827813761665ce348e33768cb1875a9704"
										target="_blank"><img alt="BSCSCAN" className="social-icons"
											src="assets/img/social-icons/bscscan3.png" /><span
											className="hide-mobile">Verified Contract</span></a></li>
							</ul>
						</center>

					</div>
                </Row>
			</footer>
    )
}
