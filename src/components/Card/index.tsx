import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import ContentGrid from './ContentGrid';
import Typography from '@mui/material/Typography';

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

interface CardDetailsProps {
    address: string;
    poolValue: number;
    userBalance: number;
    userAPY: number;
    userRewardInUSD: number;
    lpTokensStaked: number;
}

const CardDetails: FC<CardDetailsProps> = ({
    poolValue,
    address,
    userBalance,
    userAPY,
    userRewardInUSD,
    lpTokensStaked,
}) => {
    const gridContents = [
        {
            label: 'User Ethereum Address',
            value: address,
        },
        {
            label: 'Uniswap BOND/USDC Pool Value',
            value: USDollar.format(poolValue),
        },
        {
            label: 'User LP Tokens Staked in Barnbridge',
            value: lpTokensStaked.toString(),
        },
        {
            label: 'User LP Tokens Staked Value',
            value: USDollar.format(userBalance),
        },
        {
            label: 'User Annual Percentage Yeild',
            value: `${userAPY.toFixed(2)}%`,
        },
        {
            label: 'User Reward In USD',
            value: USDollar.format(userRewardInUSD),
        },
    ];

    return (
        <Card style={{ marginTop: 15 }}>
            <CardHeader
                title={
                    <Typography variant="h5">
                        Barnbridge BOND/USDC pair and Stake the Liquidity
                        Provider (LP) Tokens
                    </Typography>
                }
                avatar={
                    <Avatar
                        src={
                            'https://etherscan.io/token/images/barnbridge_32.png'
                        }
                    />
                }
            />
            <CardContent>
                <ContentGrid gridContents={gridContents} />
            </CardContent>
        </Card>
    );
};

export default CardDetails;
