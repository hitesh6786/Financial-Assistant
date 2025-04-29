import { z } from "zod";

export const GetTokenAddressArgumentsSchema = z.object({
    symbol: z.string().describe("The symbol of the token to get address for. This is typically a 3-5 character string."),
});