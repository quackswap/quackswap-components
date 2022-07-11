import { CBTT, ChainId, Currency, Token, WBTT } from '@hotcrosscom/quackswap-sdk';
import { NativeCurrency as UniCurrency, Token as UniToken } from '@uniswap/sdk-core';

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === CBTT[chainId] ? WBTT[chainId] : currency instanceof Token ? currency : undefined;
}

function convertToQuackSwapToken(token: UniToken): Token {
  return new Token(token.chainId, token.address, token.decimals, token?.symbol, token?.name);
}

export function wrappedGelatoCurrency(
  currency: UniCurrency | UniToken,
  chainId: ChainId | undefined,
): Token | undefined {
  return chainId && !currency?.isToken
    ? WBTT[chainId]
    : currency.isToken
    ? convertToQuackSwapToken(currency)
    : undefined;
}

export function unwrappedToken(token: Token, chainId: ChainId): Currency | Token {
  if (token?.equals?.(WBTT[token.chainId])) return CBTT[chainId];
  return token;
}
