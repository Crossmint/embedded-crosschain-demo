"use client";

import React, { useState, useEffect } from "react";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
import { EVMBlockchainIncludingTestnet as Blockchain } from "@crossmint/common-sdk-base";
//import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core"; // newer version of dynamic
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react";
import Minting from "./Minting";

type PaymentMethod = "ETH" | "SOL" | "fiat";

interface CrossmintProps {
  collectionId: string;
  collectionChain: string;
  minting: boolean;
  setMinting: Function;
}

const Crossmint: React.FC<CrossmintProps> = ({
  collectionId,
  collectionChain,
  minting,
  setMinting,
}) => {
  const [orderIdentifier, setOrderIdentifier] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("ETH");
  const [signer, setSigner] = useState<any>();
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState<Blockchain>("ethereum-sepolia");

  const { walletConnector } = useDynamicContext();
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string;

  useEffect(() => {
    async function getWalletSigner() {
      try {
        const _signer = await walletConnector?.getSigner();

        console.log("signer: ", _signer);
        const _address = await walletConnector?.fetchPublicAddress();
        setSigner(_signer);
        setAddress(_address || "");
      } catch (error) {
        console.error("Error getting Ethereum signer:", error);
      }
    }

    getWalletSigner();
  }, [walletConnector]);

  const getButtonClass = (method: PaymentMethod) => {
    let baseClass =
      "flex items-center justify-center bg-gray-100 px-5 py-2 shadow-sm hover:shadow-lg rounded cursor-pointer transition-shadow duration-200 border-solid border-2";
    if (method === paymentMethod) {
      baseClass += " border-indigo-500";
    }
    return baseClass;
  };

  const getChainId = (chain: string) => {
    switch (chain) {
      case "arbitrum-sepolia":
        return 421614;
      case "base-sepolia":
        return 84532;
      case "ethereum-sepolia":
        return 11155111;
      case "optimism-sepolia":
        return 1155420;
      case "zora-sepolia":
        return 999999999;
    }
  };

  const handlePaymentEvent = (event: any) => {
    switch (event.type) {
      case "crypto-payment:user-accepted":
        break;

      case "payment:process.started":
        break;

      case "payment:process.succeeded":
        console.log(event);
        setOrderIdentifier(event.payload.orderIdentifier);
        break;
      default:
        console.log(event);
        break;
    }
  };

  return (
    <>
      <div className="sm:col-span-3">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setPaymentMethod("ETH")}
            className={getButtonClass("ETH")}
          >
            ETH
          </button>
          {/* <button
            onClick={() => setPaymentMethod("SOL")}
            className={getButtonClass("SOL")}
          >
            SOL
          </button> */}
          <button
            onClick={() => setPaymentMethod("fiat")}
            className={getButtonClass("fiat")}
          >
            Credit Card
          </button>
        </div>

        {!orderIdentifier ? (
          paymentMethod === "ETH" ? (
            <div className="loading-bg">
              <div className="loading-spinner" />
              <div className="payment-wrapper">
                <DynamicWidget />
                <CrossmintPaymentElement
                  key={collectionId}
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
                      console.log("handlechainswitch chain: ", chain);
                      await walletConnector!.switchNetwork({
                        networkChainId: getChainId(chain),
                      });
                      setNetwork(chain);
                    },
                    supportedChains: [
                      "arbitrum-sepolia",
                      "base-sepolia",
                      "ethereum-sepolia",
                      "optimism-sepolia",
                    ],
                    chain: network,
                  }}
                  mintConfig={{
                    type: "erc-721",
                    totalPrice: "0.0001",
                  }}
                  uiConfig={{
                    colors: {
                      textLink: "green",
                    },
                  }}
                  onEvent={handlePaymentEvent}
                />
              </div>
            </div>
          ) : paymentMethod === "SOL" ? (
            <div className="loading-bg">
              <div className="loading-spinner" />
              <div className="payment-wrapper">
                <CrossmintPaymentElement
                  key={collectionId}
                  projectId={projectId}
                  collectionId={collectionId}
                  environment={environment}
                  paymentMethod="SOL"
                  signer={{
                    address: address,
                    signAndSendTransaction: async (transaction) => {
                      const signRes = await signer.sendTransaction(transaction);
                      return signRes.hash;
                    },
                  }}
                  mintConfig={{
                    type: "erc-721",
                    totalPrice: "0.0001",
                  }}
                  uiConfig={{
                    colors: {
                      textLink: "green",
                    },
                  }}
                  onEvent={handlePaymentEvent}
                />
              </div>
            </div>
          ) : paymentMethod === "fiat" ? (
            <div className="loading-bg">
              <div className="loading-spinner" />
              <div className="payment-wrapper">
                <CrossmintPaymentElement
                  key={collectionId}
                  projectId={projectId}
                  collectionId={collectionId}
                  environment={environment}
                  emailInputOptions={{
                    show: true,
                  }}
                  mintConfig={{
                    type: "erc-721",
                    totalPrice: "0.0001",
                  }}
                  uiConfig={{
                    colors: {
                      textLink: "green",
                    },
                  }}
                  onEvent={handlePaymentEvent}
                />
              </div>
            </div>
          ) : null
        ) : (
          <Minting orderIdentifier={orderIdentifier} chain={collectionChain} />
        )}
      </div>
    </>
  );
};

export default Crossmint;
