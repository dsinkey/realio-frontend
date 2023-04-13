import { ethers } from 'ethers';
import barnbridge_staking from '../components/contract-interfaces/barnbridge_staking.json';
import { Barnbridge_staking } from '../components/types/ethers-contracts';
const BARNBRIDGE_STAKING_ADDR = '0xb0Fa2BeEe3Cf36a7Ac7E99B885b48538Ab364853';
const UNISWAP_BONDUSDC_ADDR = '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244';

const RPC_URL = 'https://cloudflare-eth.com/';
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// BarnBridge Staking Contract:
//  - https://etherscan.io/address/0xb0fa2beee3cf36a7ac7e99b885b48538ab364853#readContract
const barnbridgeContract = new ethers.Contract(
    BARNBRIDGE_STAKING_ADDR,
    barnbridge_staking,
    provider
) as Barnbridge_staking;

const callBarnbridgeGetAddress = async (address: string) => {
    // We get the amount of LP Tokens the user staked in the barnbridge contract
    const userLPTokensStaked = await barnbridgeContract.balanceOf(
        address,
        UNISWAP_BONDUSDC_ADDR
    );
    const lpTokensStaked = Number(
        ethers.utils.formatUnits(userLPTokensStaked, 18)
    );

    return lpTokensStaked;
};

export default callBarnbridgeGetAddress;
