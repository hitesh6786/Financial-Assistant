import { queryBirdeye } from "./base";

import { Portfolio } from "./types";

export const getPortfolio = async (wallet: string): Promise<Portfolio> => {
  return queryBirdeye<Portfolio>(`v1/wallet/token_list`, { wallet });
}