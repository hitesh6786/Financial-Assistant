import React from 'react'

import Header from './_components/header';
import Tokens from './_components/tokens';
import LiquidityPools from './_components/liquidity-pools';

import { getPortfolio } from '@/services/birdeye';
import { getLpPortfolio } from '@/services/raydium';
import { getTransactionHistory } from '@/services/helius';
import Transactions from './_components/transactions';
import { SwapModalProvider } from './_contexts/use-swap-modal';

const Portfolio = async ({ params }: { params: Promise<{ address: string }> }) => {

    const { address } = await params;

    const [
        portfolio,
        lpPortfolio,
        transactions
    ] = await Promise.all([
        getPortfolio(address),
        getLpPortfolio(address),
        getTransactionHistory(address).then(transactions => transactions.filter(transaction => transaction.feePayer === address))
    ])

    return (
        <SwapModalProvider>
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 md:pt-4 h-full overflow-y-scroll no-scrollbar">
                <Header
                    address={address}
                />
                <Tokens
                    portfolio={portfolio}
                />
                <LiquidityPools
                    portfolio={lpPortfolio}
                />
                <Transactions
                    transactions={transactions}
                    address={address}
                />
            </div>
        </SwapModalProvider>
    )
}

export default Portfolio;