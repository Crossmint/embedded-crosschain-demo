import React from "react";
import Image from "next/image";
import { useCrossmintEvents } from "@crossmint/client-sdk-react-ui";
import { OpenSeaButton, ScannerButton, RestartButton } from "./NFTButtons";

interface MintingProps {
  orderIdentifier: string;
  chain: string;
}

const Minting: React.FC<MintingProps> = ({ orderIdentifier, chain }) => {
  const [status, setStatus] = React.useState<string>("pending");
  const [result, setResult] = React.useState<any>(null);
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string;
  const { listenToMintingEvents } = useCrossmintEvents({
    environment: environment,
  });

  if (orderIdentifier && status === "pending") {
    listenToMintingEvents({ orderIdentifier }, (event) => {
      switch (event.type) {
        case "transaction:fulfillment.succeeded":
          setStatus("success");
          setResult(event.payload);
          break;
        case "transaction:fulfillment.failed":
          setStatus("failure");
          break;
        default:
          break;
      }
      console.log(event.type, ":", event);
    });
  }

  return (
    <>
      {orderIdentifier ? (
        <div className="text-black font-mono p-5 text-center">
          {status === "pending" && (
            <>
              <h3>Minting your NFT...</h3>
              <Image
                src="/sphere.gif"
                width={256}
                height={256}
                className="shrink mx-auto mt-10"
                alt="processing animation"
              />
              This will take about a minute.
            </>
          )}
          {status === "success" && (
            <>
              <h3>NFT Minted Successfully!</h3>
              <div className="mt-10">
                <OpenSeaButton env={environment} chain={chain} token={result} />
                <ScannerButton env={environment} chain={chain} token={result} />
                <RestartButton />
              </div>
            </>
          )}
          {status === "failure" && (
            <>
              <h3>Failed to Mint NFT</h3>
              <p>
                Something went wrong. You will be refunded if the mint cannot be
                fulfilled successfully.
              </p>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Minting;
