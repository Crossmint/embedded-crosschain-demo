"use client";

import React, { useState } from "react";
import Navigation from "./components/Navigation";
import CollectionInfo from "./components/CollectionInfo";
import Crossmint from "./components/Crossmint";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum-all";

export type CollectionChain = "solana" | "base" | "polygon";

export const DYNAMIC_EVM_WALLET_CONNECTOR_NETWORKS = [
  {
    blockExplorerUrls: ["https://sepolia.arbiscan.io"],
    chainId: 421614,
    chainName: "arbitrum-sepolia",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/arbitrum.svg"],
    name: "Arbitrum Sepolia",
    nativeCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH",
    },
    networkId: 421614,
    rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
    vanityName: "Arbitrum Sepolia",
  },
  {
    blockExplorerUrls: ["https://sepolia-optimistic.etherscan.io/"],
    chainId: 11155420,
    chainName: "optimism-sepolia",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/optimism.svg"],
    name: "OP Sepolia",
    nativeCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH",
    },
    networkId: 11155420,
    rpcUrls: ["https://sepolia.optimism.io"],
    vanityName: "OP Sepolia",
  },
];

const collection = {
  polygon: process.env.NEXT_PUBLIC_POLYGON_ID,
  solana: process.env.NEXT_PUBLIC_SOLANA_ID,
  base: process.env.NEXT_PUBLIC_BASE_ID,
};

const Page: React.FC = () => {
  const [collectionChain, setCollectionChain] =
    useState<CollectionChain>("solana");
  const [collectionId, setCollectionId] = useState(collection.solana);
  const [minting, setMinting] = useState(false);

  const handleCollectionSelect = (selectedChain: CollectionChain) => {
    setCollectionChain(selectedChain);
    setCollectionId(collection[selectedChain]);
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "73039506-8577-45f7-a8c6-3782b4e9be00",
        walletConnectors: [EthereumWalletConnectors],
        evmNetworks: DYNAMIC_EVM_WALLET_CONNECTOR_NETWORKS,
        initialAuthenticationMode: "connect-only",
        cssOverrides: `
          .dynamic-widget-inline-controls > div {
          width: 50%;
        }`,
      }}
    >
      <div className="container mx-auto max-w-4xl bg-white rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-6 sm:gap-12 p-12">
          <Navigation />
          <CollectionInfo
            onCollectionSelect={handleCollectionSelect}
            collectionChain={collectionChain}
            minting={minting}
          />
          <Crossmint
            collectionId={collectionId || ""}
            collectionChain={collectionChain || ""}
            minting={minting}
            setMinting={setMinting}
          />
        </div>
      </div>
    </DynamicContextProvider>
  );
};

export default Page;
