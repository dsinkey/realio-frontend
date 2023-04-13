//Each Week 20'000 BOND Tokens are issued as rewards
export const BOND_ISSUED_YEARLY = 20000 * 52;

export const getTotalRewardUSD = (
    bondPrice: number,
    lpTokensStaked: number,
    totalLPTokens: number
) => {
    const totalBondIssuedYearly = BOND_ISSUED_YEARLY * bondPrice;
    const userPercentageStaked = lpTokensStaked / totalLPTokens;
    return totalBondIssuedYearly * userPercentageStaked;
};

export const getAnnualPercentageYield = (
    yearlyRewardUSD: number,
    liquityProvidedUSD: number
) => {
    return (yearlyRewardUSD / liquityProvidedUSD) * 100;
};
