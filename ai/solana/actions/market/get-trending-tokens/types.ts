import { z } from "zod";

import type { GetTrendingTokensInputSchema } from "./input-schema";
import type { SolanaActionResult } from "../../solana-action";
import type { JupiterTokenData } from "@/services/jupiter";

export type GetTrendingTokensSchemaType = typeof GetTrendingTokensInputSchema;

export type GetTrendingTokensArgumentsType = z.infer<GetTrendingTokensSchemaType>;

export type GetTrendingTokensResultBodyType = {
    tokens: JupiterTokenData[];
    prices: number[];
}; 

export type GetTrendingTokensResultType = SolanaActionResult<GetTrendingTokensResultBodyType>;