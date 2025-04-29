import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { GetTrendingTokensResultBodyType, GetTrendingTokensResultType } from '@/ai';
import type { JupiterTokenData } from '@/services/jupiter';
import { Card } from '@/components/ui';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const GetTrendingTokens: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Trending Tokens...`}
            result={{
                heading: (result: GetTrendingTokensResultType) => result.body 
                    ? `Fetched Trending Tokens`
                    : `Failed to fetch trending tokens`,
                body: (result: GetTrendingTokensResultType) => result.body 
                    ? <TrendingTokens body={result.body} />
                    :  "No trending tokens found"
            }}
            defaultOpen={true}
            prevToolAgent={prevToolAgent}
            className="w-full"
        />
    )
}

const TrendingTokens = ({ body }: { body: GetTrendingTokensResultBodyType }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {body.tokens.map((token: JupiterTokenData, index: number) => (
                <TokenCard
                    key={token.address} 
                    token={token} 
                    price={body.prices[index]}
                />
            ))}
        </div>
    )
}

const TokenCard = ({ token, price }: { token: JupiterTokenData, price: number }) => {
    return (
        <Card className="flex flex-col gap-2 p-2 justify-center">
            <div className="flex flex-row items-center gap-2">
                <img 
                    src={token.logoURI} 
                    alt={token.name} 
                    className="w-10 h-10 rounded-full" 
                />
                <div className="flex flex-col">
                    <p className="text-sm font-bold">{token.name} ({token.symbol})</p>
                    <p className="text-xs text-muted-foreground">${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">24h Volume: ${token.daily_volume.toLocaleString()}</p>
            </div>
        </Card>
    )
}

export default GetTrendingTokens;