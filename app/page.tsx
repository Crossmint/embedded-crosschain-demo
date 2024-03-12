"use client";

import React, { useState } from "react";
import Navigation from "./components/Navigation";
import CollectionInfo from "./components/CollectionInfo";
import Crossmint from "./components/Crossmint";
import Footer from "./components/Footer";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  sepolia,
  baseSepolia,
  optimismSepolia,
  arbitrumSepolia,
  zoraSepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Crossmint Crosschain Demo",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
  chains: [sepolia, baseSepolia, optimismSepolia, arbitrumSepolia, zoraSepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export type CollectionChain = "solana" | "base" | "polygon";

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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <div className="container mx-auto max-w-2xl bg-white rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-6 sm:gap-8 p-8">
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
          <Footer />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Page;
