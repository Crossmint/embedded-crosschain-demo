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
    if (minting) {
      baseClass += " opacity-50 cursor-not-allowed";
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
        setMinting(true);
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

  const account = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { data: hash, sendTransactionAsync } = useSendTransaction();

  const connectedWallet =
    collectionChain === "base" || collectionChain === "polygon"
      ? account.address
      : "";

  return (
    <>
      <div className="sm:col-span-3">
        <div className="my-5">
          <strong>Step 2 - </strong> Choose a payment method ↓
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setPaymentMethod("ETH")}
            className={getButtonClass("ETH")}
            disabled={minting}
          >
            ETH
          </button>
          <button
            onClick={() => setPaymentMethod("fiat")}
            className={getButtonClass("fiat")}
            disabled={minting}
          >
            Credit Card
          </button>
        </div>

        {!orderIdentifier ? (
          paymentMethod === "ETH" ? (
            <>
              <div className="connect-wrapper my-5">
                <ConnectButton
                  showBalance={false}
                  chainStatus="none"
                  accountStatus="full"
                />
              </div>
              {account.address ? (
                <div className="loading-bg">
                  <div className="loading-message">Loading Checkout...</div>
                  <div className="loading-spinner" />
                  <div className="payment-wrapper">
                    <CrossmintPaymentElement
                      key={collectionId}
                      projectId={projectId}
                      collectionId={collectionId}
                      environment={environment}
                      recipient={{
                        wallet: connectedWallet,
                      }}
                      paymentMethod="ETH"
                      signer={{
                        address: account?.address || "",
                        signAndSendTransaction: async (transaction) => {
                          const result = await sendTransactionAsync({
                            to: transaction.to as `0x${string}`,
                            value: BigInt(transaction.value.toString()),
                            data: transaction.data as `0x${string}`,
                            chainId: transaction.chainId,
                          });

                          return result;
                        },
                        handleChainSwitch: async (chain) => {
                          console.log("handlechainswitch chain: ", chain);
                          switchChain({
                            chainId:
                              chainIdMap[chain as keyof typeof chainIdMap],
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
                            chainIdMap[key as keyof typeof chainIdMap] ===
                            chainId
                        ) as Blockchain | undefined,
                      }}
                      mintConfig={{
                        type: "erc-721",
                        totalPrice: "0.0001",
                      }}
                      uiConfig={{
                        colors: {
                          textLink: "green",
                          backgroundSecondary: "white",
                        },
                      }}
                      onEvent={handlePaymentEvent}
                    />
                  </div>
                </div>
              ) : (
                <div>You must connect a wallet first</div>
              )}
            </>
          ) : paymentMethod === "fiat" ? (
            <div className="loading-bg">
              <div className="loading-message">Loading Checkout...</div>
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
                  paymentMethod="fiat"
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
        ) : null}
        <Minting orderIdentifier={orderIdentifier} chain={collectionChain} />
      </div>
    </>
  );
};

export default Crossmint;
