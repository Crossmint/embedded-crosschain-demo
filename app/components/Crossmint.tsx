"use client";

import React, { useState, useEffect } from "react";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
import { EVMBlockchainIncludingTestnet as Blockchain } from "@crossmint/common-sdk-base";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
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

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string;

  const getButtonClass = (method: PaymentMethod) => {
    let baseClass =
      "flex items-center justify-center bg-gray-100 px-5 py-2 shadow-sm hover:shadow-lg rounded cursor-pointer transition-shadow duration-200 border-solid border-2";
    if (method === paymentMethod) {
      baseClass += " border-indigo-500";
    }
    return baseClass;
  };

  const chainIdMap = {
    "arbitrum-sepolia": 421614,
    "base-sepolia": 84532,
    "ethereum-sepolia": 11155111,
    "optimism-sepolia": 1155420,
    "zora-sepolia": 999999999,
  };

  const handlePaymentEvent = (event: any) => {
    switch (event.type) {
      case "crypto-payment:user-accepted":
        console.log("crypto-payment:user-accepted", event);
        break;

      case "payment:process.started":
        console.log("payment:process.started", event);

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

  const signer = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { data: hash, sendTransactionAsync } = useSendTransaction();

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
                <div className="connect-wrapper my-5">
                  <ConnectButton
                    showBalance={false}
                    chainStatus="none"
                    accountStatus="full"
                  />
                </div>
                <CrossmintPaymentElement
                  key={collectionId}
                  projectId={projectId}
                  collectionId={collectionId}
                  environment={environment}
                  paymentMethod="ETH"
                  signer={{
                    address: signer?.address || "",
                    signAndSendTransaction: async (transaction) => {
                      return await sendTransactionAsync({
                        to: transaction.to as `0x${string}`,
                        value: BigInt(transaction.value.toString()),
                        data: transaction.data as `0x${string}`,
                      });
                    },
                    handleChainSwitch: async (chain) => {
                      console.log("handlechainswitch chain: ", chain);
                      switchChain({
                        chainId: chainIdMap[chain as keyof typeof chainIdMap],
                      });
                    },
                    supportedChains: [
                      "arbitrum-sepolia",
                      "base-sepolia",
                      "ethereum-sepolia",
                      "optimism-sepolia",
                    ],
                    chain: Object.keys(chainIdMap).find(
                      (key) =>
                        chainIdMap[key as keyof typeof chainIdMap] === chainId
                    ) as Blockchain | undefined,
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
                  // paymentMethod="SOL"
                  // signer={{
                  //   address: address,
                  //   signAndSendTransaction: async (transaction) => {
                  //     const signRes = await signer.sendTransaction(transaction);
                  //     return signRes.hash;
                  //   },
                  // }}
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
