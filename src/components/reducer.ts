interface Uniswap {
    bondPrice: number;
    lpTokenPrice: number;
    totalValueOfPool: number;
}

interface Barnbridge {
    lpTokensStaked: number;
    userAPY: number;
    userBalance: number;
    userRewardInUSD: number;
}

interface TotalLPTokens {
    totalLPTokens: number;
}

export enum ACTIONS {
    UPDATE_UNISWAP = 'UPDATE_UNISWAP',
    UPDATE_BARNBRIDGE = 'UPDATE_BARNBRIDGE',
    UPDATE_TOTAL_LP_TOKENS = 'UPDATE_BARNBRIDGE',
}

type Action =
    | { type: ACTIONS.UPDATE_UNISWAP; payload: Uniswap }
    | { type: ACTIONS.UPDATE_BARNBRIDGE; payload: Barnbridge }
    | { type: ACTIONS.UPDATE_TOTAL_LP_TOKENS; payload: TotalLPTokens };

type State = {
    userBalance: number;
    userAPY: number;
    userRewardInUSD: number;
    bondPrice: number;
    lpTokenPrice: number;
    lpTokensStaked: number;
    totalValueOfPool: number;
    totalLPTokens: number;
};

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_UNISWAP:
            return { ...state, ...action.payload };
        case ACTIONS.UPDATE_BARNBRIDGE:
            return { ...state, ...action.payload };
        case ACTIONS.UPDATE_TOTAL_LP_TOKENS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
