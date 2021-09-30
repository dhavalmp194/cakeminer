import React from 'react'

export default function Tabs() {
    return (
        <div>
            <ul style="display:none;" className="nav nav-tabs nav-justified" id="myTabs" role="tablist">
                <li role="presentation" className="active">
                    <a href="#home" id="miners-tab" role="tab" data-toggle="tab" aria-controls="home" aria-expanded="true">
                        BNB Miner
                    </a>
                </li>
            </ul>
            
        </div>
    )
}
