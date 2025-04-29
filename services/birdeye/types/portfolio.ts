export type PortfolioItem = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    balance: string;
    uiAmount: number;
    chainId: string;
    logoURI: string;
    priceUsd: number;
    valueUsd: number;
}

export type Portfolio = {
    wallet: string;
    totalUsd: number;
    items: PortfolioItem[];
}