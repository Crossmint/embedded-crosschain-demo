"use client";

import React from "react";
import CollectionInfo from "./components/CollectionInfo";
import Crossmint from "./components/Crossmint";
// import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
// import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum-all";

export const DYNAMIC_EVM_WALLET_CONNECTOR_NETWORKS = [
  {
    blockExplorerUrls: ["https://etherscan.io/"],
    chainId: 1,
    chainName: "Ethereum Mainnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
    name: "Ethereum",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 1,

    rpcUrls: ["https://mainnet.infura.io/v3/"],
    vanityName: "ETH Mainnet",
  },
  {
    blockExplorerUrls: ["https://etherscan.io/"],
    chainId: 5,
    chainName: "Ethereum Goerli",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
    name: "Ethereum",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 5,
    rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],

    vanityName: "Goerli",
  },
  {
    blockExplorerUrls: ["https://optimistic.etherscan.io/"],
    chainId: 10,
    chainName: "OP Mainnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/optimism.svg"],
    name: "OP Mainnet",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 10,
    rpcUrls: ["https://mainnet.optimism.io/"],
    vanityName: "OP",
  },
  {
    blockExplorerUrls: ["https://basescan.org"],
    chainId: 8453,
    chainName: "Base",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/base.svg"],
    name: "Base",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 8453,
    rpcUrls: ["https://mainnet.base.org"],
    vanityName: "Base",
  },
  {
    blockExplorerUrls: ["https://explorer.arbitrum.io"],
    chainId: 42161,
    chainName: "Arbitrum One",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/arbitrum.svg"],
    name: "Arbitrum One",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 42161,
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
    vanityName: "Arbitrum One",
  },
  {
    blockExplorerUrls: ["https://goerli.arbiscan.io"],
    chainId: 421613,
    chainName: "Arbitrum Goerli",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/arbitrum.svg"],
    name: "Arbitrum Goerli",
    nativeCurrency: {
      decimals: 18,
      name: "AGOR",
      symbol: "AGOR",
    },
    networkId: 421613,
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
    vanityName: "Arbitrum Goerli",
  },
  {
    blockExplorerUrls: ["https://nova-explorer.arbitrum.io"],
    chainId: 42170,
    chainName: "Arbitrum Nova",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/arbitrumnova.svg"],
    name: "Arbitrum Nova",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 42170,
    rpcUrls: ["https://nova.arbitrum.io/rpc"],
    vanityName: "Arbitrum Nova",
  },
  {
    blockExplorerUrls: ["https://explorer.zora.energy"],
    chainId: 7777777,
    chainName: "Zora",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/zora.svg"],
    name: "Zora",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 7777777,
    rpcUrls: ["https://rpc.zora.energy/"],
    vanityName: "Zora",
  },
];

const Page: React.FC = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "73039506-8577-45f7-a8c6-3782b4e9be00",
        walletConnectors: [EthereumWalletConnectors],
        evmNetworks: DYNAMIC_EVM_WALLET_CONNECTOR_NETWORKS,
      }}
    >
      <div className="container mx-auto max-w-4xl bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-5 sm:gap-4 p-4">
          <CollectionInfo />
          <Crossmint />
        </div>
      </div>
    </DynamicContextProvider>
  );
};

export default Page;
