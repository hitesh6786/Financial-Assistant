'use client'

import React from 'react'

import Address from '@/app/_components/address'

import type { Token } from '@/db/types'
import type { DexScreenerPair } from '@/services/dexscreener/types'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui'
import { AlertCircle } from 'lucide-react'

interface Props {
    token: Token,
    topPair: DexScreenerPair
}

const GetTokenDataResultHeading: React.FC<Props> = ({ token, topPair }) => {
    return (
        <Card className="p-2 flex justify-between gap-4">
            <div className="flex items-center gap-2">
                <img 
                    src={token.logoURI} 
                    alt={token.name} 
                    className="w-10 h-10 rounded-full" 
                />
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <h1 className="text-xl font-bold">{token.name} ({token.symbol})</h1>
                        <Address address={token.id} />
                    </div>
                    <p className="text-sm font-semibold flex items-center gap-1">
                        ${topPair.priceUsd} 
                        {
                            topPair.priceChange && (
                                <span 
                                    className={cn(
                                        "text-xs",
                                        topPair.priceChange.h24 > 0 ? "text-green-500" : "text-red-500"
                                    )}
                                >
                                    {topPair.priceChange ? `(${topPair.priceChange.h24 > 0 ? "+" : ""}${topPair.priceChange.h24}%)` : ""}
                                </span>
                            )
                        }
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {
                    token.mintAuthority && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                    )
                }
                <p className="text-xs">
                    {token.mintAuthority ? "Mintable" : "Not Mintable"}
                </p>
            </div>
        </Card>
    )
}

export default GetTokenDataResultHeading;