import React from 'react'

export default function NavBar() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                </div>

                <div className="mobile-align">
                    <ul className="nav navbar-nav navbar-right font-weight-normal">
                        <li>
                            <a className="social-pad">
                                <img src="#" className="social-icons" onClick="document.getElementById('lostmojo').pause();" />
                                <span className="hide-mobile">
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className="social-pad" href="https://t.me/bnbminer" target="_blank">
                                <img alt="telegram" className="social-icons" src="assets/img/social-icons/telegram.svg" />
                                <span className="hide-mobile">Telegram</span>
                            </a>
                        </li>
                        <li>
                            <a className="social-pad" href="https://bscscan.com/address/0xce93f9827813761665ce348e33768cb1875a9704" target="_blank">
                                <img alt="BSCSCAN" className="social-icons" src="assets/img/social-icons/bscscan3.png" />
                                <span className="hide-mobile">Verified Contract</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
