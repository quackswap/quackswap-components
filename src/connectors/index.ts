import { Web3Provider } from '@ethersproject/providers';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { InjectedConnector } from '@pangolindex/web3-react-injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { DefiConnector } from './DefiConnector';
import { NetworkConnector } from './NetworkConnector';

const NETWORK_URL = 'https://rpc.bt.io';

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '199');

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`);
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  defaultChainId: NETWORK_CHAIN_ID,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any);
  return networkLibrary;
}

export const injected = new InjectedConnector({
  supportedChainIds: [199],
});

export const gnosisSafe = new SafeAppConnector({
  supportedChainIds: [199],
});

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  supportedChainIds: [199],
  appName: 'QuackSwap',
  appLogoUrl: 'https://raw.githubusercontent.com/pangolindex/interface/master/public/images/384x384_App_Icon.png',
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    199: NETWORK_URL,
  },
  qrcode: true,
  // bridge: 'https://bridge.walletconnect.org',
});

export const xDefi = new DefiConnector({
  supportedChainIds: [199],
});
