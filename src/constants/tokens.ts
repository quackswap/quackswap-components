import { CHAINS, ChainId, Token } from '@@hotcrosscom/quackswap-sdk';

export const QUACK: { [chainId in ChainId]: Token } = {
  [ChainId.BITTORRENT_MAINNET]: new Token(
    ChainId.BITTORRENT_MAINNET,
    CHAINS[ChainId.BITTORRENT_MAINNET].contracts!.quack_token,
    18,
    CHAINS[ChainId.BITTORRENT_MAINNET].quack_symbol,
    'QUACK',
  ),
};
