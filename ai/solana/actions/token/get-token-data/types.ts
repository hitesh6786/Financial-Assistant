import { z } from "zod";

import { GetTokenDataInputSchema } from "./input-schema";

import type { SolanaActionResult } from "../../solana-action";
import type { Token } from "@/db/types";
import type { ApiV3PoolInfoItem } from "@raydium-io/raydium-sdk-v2";
import type { DexScreenerPair } from "@/services/dexscreener/types";

export type GetTokenDataSchemaType = typeof GetTokenDataInputSchema;

export type GetTokenDataArgumentsType = z.infer<GetTokenDataSchemaType>;

export type GetTokenDataResultBodyType = {
    token: Token;
    pairs: {
        pair: DexScreenerPair;
        pool: ApiV3PoolInfoItem
    }[];
}; 

export type GetTokenDataResultType = SolanaActionResult<GetTokenDataResultBodyType>;