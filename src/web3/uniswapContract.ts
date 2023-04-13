import { ethers } from 'ethers';
import uniswap_bondusdc from '../components/contract-interfaces/uniswap_bondusdc.json';
import { Uniswap_bondusdc } from '../components/types/ethers-contracts';

const UNISWAP_BONDUSDC_ADDR = '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244';

const RPC_URL = 'https://cloudflare-eth.com/';
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Uniswap LP Token Contract:
//  - https://etherscan.io/address/0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244#readContract
const uniswapContract = new ethers.Contract(
    UNISWAP_BONDUSDC_ADDR,
    uniswap_bondusdc,
    provider
) as Uniswap_bondusdc;

const callUniSwapContract = async () => {
    // Uniswap liquidity pools have two sides, in this case BOND and USDC
    const [bondReserves, usdcReserves] = await uniswapContract.getReserves();
    const lpBondTotalSupply = await uniswapContract.totalSupply();

    const totalSupply = Number(ethers.utils.formatUnits(lpBondTotalSupply, 18));
    const usdcReservesNumber = Number(
        ethers.utils.formatUnits(usdcReserves, 6)
    );
    const bondReservesNumber = Number(
        ethers.utils.formatUnits(bondReserves, 18)
    );
    // The USD value of the two sides is always equal, so we can get the amount of USDC
    // in the pool and multiply it by 2 to get the total USD value of the pool
    const totalValueOfPool = usdcReservesNumber * 2;
    // The price of a BOND token is the usdcReserves divided by the bondReserves
    const bondPrice = usdcReservesNumber / bondReservesNumber;
    // The value of the LP token is calculated as the total Value of the Liquidity Pool
    // divided by the total supply
    // https://dailydefi.org/articles/lp-token-value-calculation/
    const lpTokenPrice = totalValueOfPool / totalSupply;

    return { totalSupply, totalValueOfPool, bondPrice, lpTokenPrice };
};

export default callUniSwapContract;
