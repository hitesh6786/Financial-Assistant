import { getPrices } from "@/services/jupiter";

import type { GetTrendingTokensArgumentsType, GetTrendingTokensResultBodyType } from "./types";
import type { SolanaActionResult } from "../../solana-action";
import type { JupiterTokenData } from "@/services/jupiter";

/**
 * Gets the trending tokens from Jupiter API using the birdeye-trending tag.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTrendingTokens(
  args: GetTrendingTokensArgumentsType
): Promise<SolanaActionResult<GetTrendingTokensResultBodyType>> {
  try {
    const response = await fetch('https://tokens.jup.ag/tokens?tags=birdeye-trending');
    if (!response.ok) {
      throw new Error('Failed to fetch trending tokens');
    }

    let tokens: JupiterTokenData[] = await response.json();

    if (args.limit && args.limit > 0) {
      tokens = tokens.slice(0, args.limit);
    }

    const pricesMapping = await getPrices(tokens.map((token) => token.address));

    const prices = tokens.map((token) => parseFloat(pricesMapping[token.address]?.price ?? "0"));

    return {
      message: `Found ${tokens.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
      body: {
        tokens,
        prices
      }
    };
  } catch (error) {
    return {
      message: `Error getting trending tokens: ${error}`,
      body: {
        tokens: [],
        prices: []
      }
    };
  }
}
