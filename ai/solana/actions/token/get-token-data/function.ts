import { getRaydiumPoolById } from "@/services/raydium";
import { getToken, getTokenBySymbol } from "@/db/services";
import { getTokenPairsFromAddress } from "@/services/dexscreener";

import type { SolanaActionResult } from "../../solana-action";
import type { GetTokenDataArgumentsType, GetTokenDataResultBodyType } from "./types";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(args: GetTokenDataArgumentsType): Promise<SolanaActionResult<GetTokenDataResultBodyType>> {
  try {

    if (args.address) {
        const token = await getToken(args.address);
        if (!token) throw new Error('No token data found');
        const dexscreenerPairs = await getTokenPairsFromAddress(args.address);
        
        const pairs = await Promise.all(dexscreenerPairs.filter(pair => pair.dexId === "raydium").map(async (pair) => {
            const raydiumPool = await getRaydiumPoolById(pair.pairAddress);
            return {
                pair,
                pool: raydiumPool
            };
        }));
        return {
            message: `Found token data for ${args.address}. The user is shown the following token data in the UI, DO NOT REITERATE THE TOKEN DATA. Ask the user what they want to do next.`,
            body: {
                token,
                pairs
            }
        }
    } else if (args.ticker) {
        const token = await getTokenBySymbol(args.ticker);
        if (!token) throw new Error('No token data found');
        const dexscreenerPairs = await getTokenPairsFromAddress(token.id);
        const pairs = await Promise.all(dexscreenerPairs.filter(pair => pair.dexId === "raydium").map(async (pair) => {
            const raydiumPool = await getRaydiumPoolById(pair.pairAddress);
            return {
                pair,
                pool: raydiumPool
            };
        }));
        return {
            message: `Found token data for ${args.ticker}. The user is shown the following token data in the UI, DO NOT REITERATE THE TOKEN DATA. Ask the user what they want to do next.`,
            body: {
                token,
                pairs
            }
        }
    } else {
        throw new Error('Invalid input');
    }
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}