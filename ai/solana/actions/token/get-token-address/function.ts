
import type { SolanaActionResult } from "../../solana-action";

import type { GetTokenAddressArgumentsType, GetTokenAddressResultBodyType } from "./types";
import { getTokenBySymbol } from "@/db/services";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenAddress(args: GetTokenAddressArgumentsType): Promise<SolanaActionResult<GetTokenAddressResultBodyType>> {
  try {

    const token = await getTokenBySymbol(args.symbol);
    if (!token) {
        throw new Error('Failed to fetch token data');
    }
    return {
        message: `Found token address for ${args.symbol}. The user is shown the following token address in the UI, DO NOT REITERATE THE TOKEN ADDRESS. Ask the user what they want to do next.`,
        body: {
          address: token.id,
        }
    }
  } catch (error) {
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}