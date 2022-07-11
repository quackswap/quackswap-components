import { CBTT, Currency, WBTT, currencyEquals } from '@hotcrosscom/quackswap-sdk';
import { useMemo } from 'react';
import { tryParseAmount } from '../state/pswap/hooks';
import { useTransactionAdder } from '../state/ptransactions/hooks';
import { useCurrencyBalance } from '../state/pwallet/hooks';
import { useWETHContract } from './useContract';
import { useChainId, useQuackSwapWeb3 } from './index';

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE };
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined,
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { account } = useQuackSwapWeb3();

  const chainId = useChainId();

  const wethContract = useWETHContract();
  const balance = useCurrencyBalance(chainId, account ?? undefined, inputCurrency);
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue]);
  const addTransaction = useTransactionAdder();

  return useMemo(() => {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE;

    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount);

    if (inputCurrency === CBTT[chainId] && currencyEquals(WBTT[chainId], outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.deposit({ value: `0x${inputAmount.raw.toString(16)}` });
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} BTT to WBTT` });
                } catch (error) {
                  console.error('Could not deposit', error);
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient BTT balance',
      };
    } else if (currencyEquals(WBTT[chainId], inputCurrency) && outputCurrency === CBTT[chainId]) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.withdraw(`0x${inputAmount.raw.toString(16)}`);
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} WBTT to BTT` });
                } catch (error) {
                  console.error('Could not withdraw', error);
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient WBTT balance',
      };
    } else {
      return NOT_APPLICABLE;
    }
  }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction]);
}
