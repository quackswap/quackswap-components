import { ChainId, Token } from '@quackswap/sdk';
import { useSelector } from 'react-redux';
import { QUACK } from 'src/constants/tokens';
import { useQuackSwapWeb3 } from 'src/hooks';
import { useAllTokens } from 'src/hooks/Tokens';
import { AppState } from '../index';

export function useSelectedCurrencyLists(): Token[] | undefined {
  const { chainId = ChainId.BITTORRENT_MAINNET } = useQuackSwapWeb3();
  const allTokens = useAllTokens();
  const coins = Object.values(allTokens || {});

  let addresses = useSelector<AppState, AppState['pwatchlists']['currencies']>((state) =>
    ([] as string[]).concat(state?.pwatchlists?.currencies || []),
  );

  addresses = [QUACK[chainId]?.address, ...addresses];

  let allSelectedToken = [] as Token[];

  addresses.forEach((address) => {
    const filterTokens = coins.filter((coin) => address.toLowerCase() === coin.address.toLowerCase());

    allSelectedToken = [...allSelectedToken, ...filterTokens];
  });

  return allSelectedToken;
}

export function useIsSelectedCurrency(address: string): boolean {
  const { chainId = ChainId.BITTORRENT_MAINNET } = useQuackSwapWeb3();

  let addresses = useSelector<AppState, AppState['pwatchlists']['currencies']>((state) =>
    ([] as string[]).concat(state?.pwatchlists?.currencies || []),
  );

  addresses = [QUACK[chainId]?.address, ...addresses];

  return (addresses || []).includes(address);
}
