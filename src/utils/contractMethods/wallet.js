import {EIPAbi} from "../contracts/EIP20Interface";
import {MinerAbi} from "../contracts/minerabi";
import Web3 from "web3"
import BigNumber from 'bignumber.js';
const web3 = new Web3(window.ethereum);
const commaNumber = require('comma-number');

BigNumber.config({ DECIMAL_PLACES: 5 });
BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_UP });
const format = commaNumber.bindWith(',', '.');
const minnerAddress = "0x43c5f4fbd2d6e6517b3d5fc44cabca899cef6e4c";
const tokenAddress = "0x2dA7daE64D1cf0122096aA52A67C4bCA363Cc372";

export const currencyFormatter = labelValue => {
    let suffix = '';
    let unit = 1;
    const abs = Math.abs(Number(labelValue));
    if (abs >= 1.0e9) {
        // Nine Zeroes for Billions
        suffix = 'B';
        unit = 1.0e9;
    } else if (abs >= 1.0e6) {
        // Six Zeroes for Millions
        suffix = 'M';
        unit = 1.0e6;
    } else if (abs >= 1.0e3) {
        // Three Zeroes for Thousands
        suffix = 'K';
        unit = 1.0e3;
    }
    return `${format(new BigNumber(`${abs / unit}`).dp(2, 1))}${suffix}`;
};

export const enableEPIToken = (userAddress) => {
    const amount = "100000000000000000000000000"; //"115792089237316195423570985008687907853";
    const tokenContract = new web3.eth.Contract(EIPAbi, tokenAddress);

    return new Promise((resolve,reject) => {
        try {
            tokenContract.methods
            .approve(minnerAddress, amount)
            .send({from: userAddress})
            .then(data => resolve(data))
            .catch(error => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

export const getTokenAllowance  = (userAddress) => {
    const tokenContract = new web3.eth.Contract(EIPAbi, tokenAddress);
    return new Promise((resolve, reject) => {
        try {
            tokenContract.methods
            .allowance(userAddress, minnerAddress)
            .call()
            .then(data => {
                console.log('%c 🍇 data: ', 'font-size:20px;background-color: #FCA650;color:#fff;', data);
                data = new BigNumber(data)
                resolve(!data.eq(new BigNumber(0)))
            })
            .catch(error => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

export const contractBalance = () => { 
    return new Promise((resolve,reject) => {
        try {
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .getBalance()
            .call().then(result => {
                result = new BigNumber(result)
                resolve(currencyFormatter(result.dividedBy(1e18)))
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            console.error('%c 🌭 error: ', 'font-size:20px;background-color: #FCA650;color:#fff;', error);
        }
    })
}

