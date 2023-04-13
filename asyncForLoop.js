const ethers = require('ethers');
const addresses = require('./src/addressesWithBond.js');
const barnbridge_staking = require('./src/components/contract-interfaces/barnbridge_staking.json');
const uniswap_bondusdc = require('./src/components/contract-interfaces/uniswap_bondusdc.json');
const callUniswapContract = require('./src/web3/uniswapContract');
const callBarnbridgeContract = require('./src/web3/barnbridgeContract');

//defining the addresses at which the contracts are deployed
const BARNBRIDGE_STAKING_ADDR = '0xb0Fa2BeEe3Cf36a7Ac7E99B885b48538Ab364853';
const UNISWAP_BONDUSDC_ADDR = '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244';

// BarnBridge Staking Contract:
//  - https://etherscan.io/address/0xb0fa2beee3cf36a7ac7e99b885b48538ab364853#readContract

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const getResults = async () => {
    for (const address of addresses) {
        console.log(
            'Get the USERS addresss balance of BOND tokens at Barnbridge'
        );
        console.log('address', address);
        const uniswapResults = await callUniswapContract();
        console.log('uniswapResults', uniswapResults);
        const barnBridgeResults = await callBarnbridgeContract(address);
        console.log('barnBridgeResults', barnBridgeResults);
    }
};

getResults();
