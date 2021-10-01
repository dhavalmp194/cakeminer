import {EIPAbi} from "../contracts/EIP20Interface";
import {MinerAbi} from "../contracts/minerabi";
import BigNumber from 'bignumber.js';
import Web3 from "web3"
const web3 = new Web3(window.ethereum);
const commaNumber = require('comma-number');

BigNumber.config({ DECIMAL_PLACES: 5 });
BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_UP });
const format = commaNumber.bindWith(',', '.');
const minnerAddress = process.env.REACT_APP_minnerAddress || "0x8ED016bBFa12EA4d655124EAFCc7509AB41DDaD1";
const tokenAddress = process.env.REACT_APP_tokenAddress ||  "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";

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
    const amount = "115792089237316195423570985008687907853269984665640564039457584007913129639935"; //"115792089237316195423570985008687907853";
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
            throw error
        }
    })
}
export const userBalance = (userAddress) => { 
    return new Promise((resolve,reject) => {
        try {
            const minerContract = new web3.eth.Contract(EIPAbi, tokenAddress);
            minerContract.methods.balanceOf(userAddress)
            .call({from: userAddress}).then(result => {
                result = new BigNumber(result)
                console.log('%c 🍥 result: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', result);
                resolve(currencyFormatter(result.dividedBy(1e18)))
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}
export const buyEggs = (userAddress, amount) => {
    return new Promise((resolve,reject) => {
        // amount = new BigNumber(amount).multipliedBy(1e18);
        console.log('%c 🍌 amount: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', amount*(10**18));
        try {
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .buyEggs(userAddress, (amount*(10**18)).toString())
            .send({from: userAddress})
            .then(result => {
                result = new BigNumber(result)
                resolve(result)
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}

export const hatchEggs = (userAddress) => {
    return new Promise((resolve,reject) => {
        try {
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .hatchEggs(userAddress)
            .send({from: userAddress})
            .then(result => {
                resolve(result)
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}

export const sellEggs = (userAddress) => {
    return new Promise((resolve,reject) => {
        try {
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .sellEggs()
            .send({from: userAddress})
            .then(result => {
                resolve(result)
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}

export const getMyMinersFromContract = (userAddress) => {
    return new Promise((resolve,reject) => {
        try {
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .getMyMiners()
            .call({from: userAddress})
            .then(result => {
                resolve(result)
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}

export const devFee = (amount) => {
    return new Promise((resolve,reject) => {
        try {
            // amount = new BigNumber(amount).multipliedBy(1e18);
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .devFee(amount.toString())
            .call()
            .then(result => {
                resolve(result)
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}

export const calculateEggBuySimple = (amount) => {
    return new Promise((resolve,reject) => {
        try {
            amount = new BigNumber(amount).multipliedBy(1e18);
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .calculateEggBuySimple(amount.toString())
            .call()
            .then(result => {
                resolve(result)
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}

export  const getMyEggs = (userAddress) => {
    return new Promise((resolve,reject) => {
        try {
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .getMyEggs()
            .call({from : userAddress})
            .then(result => {
                resolve(result)
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}
// calculateEggSell
export const calculateEggSell = (eggs) => {
    return new Promise((resolve,reject) => {
        try {
            const minerContract = new web3.eth.Contract(MinerAbi, minnerAddress);
            minerContract.methods
            .calculateEggSell(eggs)
            .call()
            .then(result => {
                resolve(result)
            }).catch((err) => {
                console.error(err)
                reject(reject)
            });
        } catch (error) {
            throw error
        }
    })
}