// TODO: Actually calculate price
import { ChainId, Currency, JSBI, Price, WBTT, currencyEquals } from '@hotcrosscom/quackswap-sdk';
import { useMemo } from 'react';
import { USDCe } from 'src/constants';
import { PairState, usePairs } from '../data/Reserves';
import { useChainId } from '../hooks';
import { wrappedCurrency } from './wrappedCurrency';

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price | undefined {
  const chainId = useChainId();
  const wrapped = wrappedCurrency(currency, chainId);
  const USDC = USDCe[chainId];
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WBTT[chainId], wrapped) ? undefined : currency,
        chainId ? WBTT[chainId] : undefined,
      ],
      [wrapped?.equals(USDC) ? undefined : wrapped, chainId === ChainId.BITTORRENT_MAINNET ? USDC : undefined],
      [chainId ? WBTT[chainId] : undefined, chainId === ChainId.BITTORRENT_MAINNET ? USDC : undefined],
    ],
    [chainId, currency, wrapped, USDC],
  );
  const [[bttPairState, bttPair], [usdcPairState, usdcPair], [usdcAvaxPairState, usdcAvaxPair]] = usePairs(tokenPairs);

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined;
    }
    // handle wbtt/btt
    if (wrapped.equals(WBTT[chainId])) {
      if (usdcPair) {
        const price = usdcPair.priceOf(WBTT[chainId]);
        return new Price(currency, USDC, price.denominator, price.numerator);
      } else {
        return undefined;
      }
    }
    // handle usdc
    if (wrapped.equals(USDC)) {
      return new Price(USDC, USDC, '1', '1');
    }

    const bttPairBTTAmount = bttPair?.reserveOf(WBTT[chainId]);
    const bttPairBTTUSDCValue: JSBI =
      bttPairBTTAmount && usdcAvaxPair
        ? usdcAvaxPair.priceOf(WBTT[chainId]).quote(bttPairBTTAmount, chainId).raw
        : JSBI.BigInt(0);

    // all other tokens
    // first try the usdc pair
    if (usdcPairState === PairState.EXISTS && usdcPair && usdcPair.reserveOf(USDC).greaterThan(bttPairBTTUSDCValue)) {
      const price = usdcPair.priceOf(wrapped);
      return new Price(currency, USDC, price.denominator, price.numerator);
    }
    if (bttPairState === PairState.EXISTS && bttPair && usdcAvaxPairState === PairState.EXISTS && usdcAvaxPair) {
      if (usdcAvaxPair.reserveOf(USDC).greaterThan('0') && bttPair.reserveOf(WBTT[chainId]).greaterThan('0')) {
        const bttUsdcPrice = usdcAvaxPair.priceOf(USDC);
        const currencyAvaxPrice = bttPair.priceOf(WBTT[chainId]);
        const usdcPrice = bttUsdcPrice.multiply(currencyAvaxPrice).invert();
        return new Price(currency, USDC, usdcPrice.denominator, usdcPrice.numerator);
      }
    }
    return undefined;
  }, [
    chainId,
    currency,
    bttPair,
    bttPairState,
    usdcAvaxPair,
    usdcAvaxPairState,
    usdcPair,
    usdcPairState,
    wrapped,
    USDC,
  ]);
}
