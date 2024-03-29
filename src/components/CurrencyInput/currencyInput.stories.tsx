import { CHAINS, ChainId, Token } from '@quackswap/sdk';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import { CurrencyInput } from '.';

export default {
  component: CurrencyInput,
  title: 'Components/CurrencyInputs',
};

const TemplateCurrencyInput: ComponentStory<typeof CurrencyInput> = (args: any) => <CurrencyInput {...args} />;

export const Default = TemplateCurrencyInput.bind({});
Default.args = {
  label: 'To',
  currency: new Token(
    ChainId.BITTORRENT_MAINNET,
    CHAINS[ChainId.BITTORRENT_MAINNET].contracts!.png,
    18,
    CHAINS[ChainId.BITTORRENT_MAINNET].png_symbol!,
    'QuackSwap',
  ),
};
