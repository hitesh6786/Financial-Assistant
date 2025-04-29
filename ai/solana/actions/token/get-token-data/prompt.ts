export const SOLANA_GET_TOKEN_DATA_PROMPT = 
`Use this function to get data for a token, dexscreener data, and raydium data.
The token data function requires a symbol, or a mint address.
If a user asks for the native token of the hive, this platform, call this function with the contract address of the native token: 9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump.
This tool returns the volume, price, and liquidity of the token if the user asks for them.`; 