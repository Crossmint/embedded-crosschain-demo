"use client";

import React, { useState, useEffect } from "react";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
//import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react";
import Minting from "./Minting";

type Chain =
  | "base"
  | "polygon"
  | "solana"
  | "cardano"
  | "sui"
  | "ethereum"
  | "ethereum-sepolia"
  | "bsc"
  | "optimism"
  | "arbitrum"
  | "zora"
  | "arbitrumnova"
  | "zkatana";

const Crossmint: React.FC = () => {
  const [orderIdentifier, setOrderIdentifier] = useState<string | null>(null);
  const [signer, setSigner] = useState<any>();
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState<Chain>("ethereum");
  const { walletConnector } = useDynamicContext();

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string;

  const getChainId = (chain: string) => {
    const chains = {
      arbitrum: 421613, // goerli
      //arbitrum: 421614, // sepolia
      //arbitrum: 42161, // mainnet
      base: 84531, // goerli
      //base: 84532, // sepolia
      //base: 8453, // mainnet
      ethereum: 5, //
      //ethereum: 11155111, // sepolia
      //ethereum: 1, // mainnet
      optimism: 420, // goerli
      //optimism: 11155420, // sepolia
      //optimism: 10, // mainnet
    };

    switch (chain) {
      case "arbitrum":
        return chains.arbitrum;
      case "ethereum":
        return chains.ethereum;
      case "base":
        return chains.base;
      case "optimism":
        return chains.optimism;
    }
  };

  useEffect(() => {
    async function getWalletSigner() {
      try {
        const _signer = await walletConnector?.getSigner();

        console.log(_signer);
        const _address = await walletConnector?.fetchPublicAddress();
        setSigner(_signer);
        setAddress(_address || "");
      } catch (error) {
        console.error("Error getting Ethereum signer:", error);
      }
    }

    getWalletSigner();
  }, [walletConnector]);

  if (
    signer == null ||
    !address ||
    !["EVM", "ETH"].includes(walletConnector?.connectedChain || "")
  ) {
    return (
      <p className="mt-2 text-s">
        Connect your ETH(Testnet) wallet to proceed.
      </p>
    );
  }

  return (
    <>
      <div className="sm:col-span-3">
        <DynamicWidget />
        {orderIdentifier === null ? (
          <CrossmintPaymentElement
            projectId={projectId}
            collectionId={collectionId}
            environment={environment}
            paymentMethod="ETH"
            signer={{
              address: address,
              signAndSendTransaction: async (transaction) => {
                const signRes = await signer.sendTransaction(transaction);
                return signRes.hash;
              },
              handleChainSwitch: async (chain) => {
                await walletConnector!.switchNetwork({
                  networkChainId: getChainId(chain),
                });
                setNetwork(chain);
              },
              supportedChains: ["arbitrum", "ethereum", "optimism", "base"],
              chain: network,
            }}
            mintConfig={{
              type: "erc-721",
              totalPrice: "0.001",
              _quantity: "1",
            }}
            onEvent={(event) => {
              switch (event.type) {
                case "payment:process.succeeded":
                  console.log(event);
                  setOrderIdentifier(event.payload.orderIdentifier);
                  break;
                default:
                  console.log(event);
                  break;
              }
            }}
          />
        ) : (
          <Minting orderIdentifier={orderIdentifier} />
        )}
      </div>
    </>
  );
};

export default Crossmint;
