import React, { useState, useEffect, useMemo, useReducer } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import callUniSwapContract from '../web3/uniswapContract';
import callBarnbridgeContract from '../web3/barnbridgeContract';
import barnbridgeGetAddressBalance from '../web3/barnbridgeGetAddressBalance';
import { SelectChangeEvent } from '@mui/material/Select';
import AddressSelect from './Select';
import adddressesStaked from '../addressesWithBond';
import Card from '../components/Card';
import { ACTIONS, reducer } from './reducer';
import { getTotalRewardUSD, getAnnualPercentageYield } from './helper';

const initalState = {
    userBalance: 0,
    userAPY: 0,
    userRewardInUSD: 0,
    bondPrice: 0,
    lpTokenPrice: 0,
    lpTokensStaked: 0,
    totalValueOfPool: 0,
    totalLPTokens: 0,
};

const Staking = () => {
    let [loading, setLoading] = useState(false);
    let [state, dispatch] = useReducer(reducer, initalState);
    const filteredAddresses = useMemo(() => {
        return adddressesStaked.filter(
            (adddress, index, list) => list.indexOf(adddress) === index
        );
    }, []);
    let [address, setAddress] = useState(filteredAddresses[0]);

    const handleChange = (event: SelectChangeEvent) => {
        setAddress(event.target.value as string);
    };

    const updateUniswap = async () => {
        const { bondPrice, lpTokenPrice, totalValueOfPool } =
            await callUniSwapContract();

        dispatch({
            type: ACTIONS.UPDATE_UNISWAP,
            payload: { bondPrice, lpTokenPrice, totalValueOfPool },
        });
    };

    const updateBarnBridge = async () => {
        const { totalLPTokens } = await callBarnbridgeContract();
        dispatch({
            type: ACTIONS.UPDATE_TOTAL_LP_TOKENS,
            payload: { totalLPTokens },
        });
    };

    useEffect(() => {
        updateBarnBridge();
        updateUniswap();
    }, []);

    useEffect(() => {
        setLoading(true);
        const updateAddressBalance = async () => {
            if (state.bondPrice && state.lpTokenPrice && state.totalLPTokens) {
                const lpTokensStaked = await barnbridgeGetAddressBalance(
                    address
                );
                const liquityProvidedUSD = state.lpTokenPrice * lpTokensStaked;
                const yearlyRewardUSD = getTotalRewardUSD(
                    state.bondPrice,
                    lpTokensStaked,
                    state.totalLPTokens
                );
                const annualPercentageYield = getAnnualPercentageYield(
                    yearlyRewardUSD,
                    liquityProvidedUSD
                );

                dispatch({
                    type: ACTIONS.UPDATE_BARNBRIDGE,
                    payload: {
                        lpTokensStaked,
                        userAPY: annualPercentageYield,
                        userBalance: liquityProvidedUSD,
                        userRewardInUSD: yearlyRewardUSD,
                    },
                });
                setLoading(false);
            }
        };
        updateAddressBalance();
    }, [
        address,
        state.bondPrice,
        state.lpTokenPrice,
        state.totalLPTokens,
        state.totalValueOfPool,
    ]);

    return (
        <div>
            <AddressSelect
                options={filteredAddresses}
                handleChange={handleChange}
                address={address}
            />
            <Card
                poolValue={state.totalValueOfPool}
                address={address}
                userBalance={state.userBalance}
                userAPY={state.userAPY}
                userRewardInUSD={state.userRewardInUSD}
                lpTokensStaked={state.lpTokensStaked}
            />
            {loading ? (
                <LinearProgress
                    style={{ marginTop: 15, borderRadius: 5, height: 7 }}
                />
            ) : null}
        </div>
    );
};

export default Staking;
