import { CHAINS, ChainId, Token } from '@quackswap/sdk';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import { DoubleCurrencyLogo } from '.';

export default {
  component: DoubleCurrencyLogo,
  title: 'Components/DoubleCurrencyLogo',
};

const currency0 = new Token(ChainId.BITTORRENT_MAINNET, '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15', 18, 'ETH', 'Ether');
const currency1 = new Token(
  ChainId.BITTORRENT_MAINNET,
  CHAINS[ChainId.BITTORRENT_MAINNET].contracts!.png,
  18,
  CHAINS[ChainId.BITTORRENT_MAINNET].png_symbol!,
  'QuackSwap',
);

const TemplateBox: ComponentStory<typeof DoubleCurrencyLogo> = (args: any) => <DoubleCurrencyLogo {...args} />;

export const DoubleLogo = TemplateBox.bind({});
DoubleLogo.args = {
  size: 24,
  currency0: currency0,
  currency1: currency1,
  margin: false,
};
