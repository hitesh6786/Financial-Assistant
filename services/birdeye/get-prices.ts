import { queryBirdeye } from "./base";

import type { Price } from "./types";

export const getPrices = async (addresses: string[]): Promise<Record<string, Price>> => {
    return queryBirdeye<Record<string, Price>>('defi/multi_price', { list_address: addresses.join(','), include_liquidity: 'true' });
};