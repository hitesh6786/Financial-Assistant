'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui';

import RaydiumPool from './raydium-pool';

import type { DexScreenerPair } from '@/services/dexscreener/types';
import type { ApiV3PoolInfoItem } from '@raydium-io/raydium-sdk-v2';

interface Props {
    pairs: {
        pair: DexScreenerPair;
        pool: ApiV3PoolInfoItem
    }[];
}

const DexStats: React.FC<Props> = ({ pairs }) => {

    const [showAll, setShowAll] = useState(false);
    
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 justify-between">
                <h2 className="text-lg font-bold">DEX Stats</h2>
            </div>
            {
                pairs.slice(0, showAll ? pairs.length : 3).map((pair) => (
                    <RaydiumPool 
                        key={`${pair.pair.dexId}-${pair.pair.pairAddress}`} 
                        pair={pair.pair} 
                        pool={pair.pool} 
                    />
                ))
            }
            <Button onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "Show All"}
            </Button>
        </div>
    )
}

export default DexStats