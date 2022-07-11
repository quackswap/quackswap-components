# components
Ui Kit for QuackSwap

## Installation

`yarn add @pangolindex/components @gelatonetwork/limit-orders-react@2.4.0 @hotcrosscom/quackswap-sdk`

or

`npm install @pangolindex/components @gelatonetwork/limit-orders-react@2.4.0 @hotcrosscom/quackswap-sdk`

## Getting started

Wrap your app with the QuackSwapProvider and pass the pangolin reducers into your redux store.

In your store pass the gelato reducers:

```tsx
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import {
  pangolinReducers,
  PANGOLIN_PERSISTED_KEYS,
} from "@pangolindex/components";

const PERSISTED_KEYS: string[] = ["your_keys", ...PANGOLIN_PERSISTED_KEYS];

const store = configureStore({
  reducer: {
    ...your_reducers,
    ...pangolinReducers,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;
```

In your main file wrap your app with `QuackSwapProvider`:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./state";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { QuackSwapProvider } from "@pangolindex/components";
import getLibrary from "./utils/getLibrary";

const AppProvider = () => {
  const { library, account, chainId } = useWeb3React();

  return (
    <QuackSwapProvider
      library={library}
      chainId={chainId}
      account={account as string}
    >
      <App />
    </QuackSwapProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <AppProvider />
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

# development flow

1. do `yarn` in components
2. do `yarn dev` which will watch for any files changes and recompiles files
3. do `yalc link "@pangolindex/components"` in the project where you want to use components

Incase react hook violation error comes, in that case follow below steps also.

1. do `yarn link` in `<project_root>/node_modules/react`.
2. do `yarn link react` in components which will symlink react which are being used by project.

# Publish flow

- do `yarn publish` which will build the components and publish to npm.
