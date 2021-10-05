import React from 'react'
import ConnectWallet from './ConnectWallet'

export default function Header() {
    return (
        <nav className="navbar navbar-default">
			<div className="container-fluid">
				<div className="navbar-header">
				</div>

				<div className="mobile-align">
					<ul className="nav navbar-nav navbar-right font-weight-normal">
						<li><a className="social-pad" href="https://t.me/PancakeminerFinance" target="_blank">
                            <img alt="telegram" className="social-icons" src="assets/img/social-icons/telegram.svg" />
                            <span className="hide-mobile">Telegram</span></a></li>
						<li>
                            <a className="social-pad" href="https://bscscan.com/address/0x8ed016bbfa12ea4d655124eafcc7509ab41ddad1#code" target="_blank">
                                <img alt="BSCSCAN" className="social-icons" src="assets/img/social-icons/bscscan3.png" />
                                <span className="hide-mobile">Verified
									Contract</span>
							</a>
						</li>
						<li>
							<ConnectWallet />
						</li>
					</ul>
				</div>
			</div>
		</nav>
    )
}
