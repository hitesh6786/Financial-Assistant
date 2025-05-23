import React from "react";

import { PoolStats } from "./pool-stats";

import type { DexScreenerPair } from "@/services/dexscreener/types";
import type { ApiV3PoolInfoItem } from "@raydium-io/raydium-sdk-v2";

interface Props {
    pair: DexScreenerPair;
    pool: ApiV3PoolInfoItem;
}

const timeframes = ["day", "week", "month"] as const;

const RaydiumPool: React.FC<Props> = ({ pair, pool }) => {

    return (
        <PoolStats pair={pair}>
            <div className="flex flex-col gap-2">
                <h3 className="text-md font-semibold">APR</h3>
                <div className="flex gap-2">
                    {timeframes.map((timeframe) => (
                        <div key={timeframe} className="flex flex-col gap-2">
                            <p className="text-sm font-medium">{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</p>
                            <p className="text-sm font-medium">${(pool[timeframe].apr / 100).toLocaleString()}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </PoolStats>
    )
}

export default RaydiumPool;