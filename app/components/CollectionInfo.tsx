import React from "react";
import CollectionImage from "./CollectionImage";
import BaseFull from "@logos/base-full";
import SolanaFull from "@logos/solana-full";
import PolygonFull from "@logos/polygon-full";
import { CollectionChain } from "../page";

interface CollectionInfoProps {
  onCollectionSelect: (selectedChain: CollectionChain) => void;
  collectionChain: CollectionChain;
  minting: boolean;
}

const CollectionInfo: React.FC<CollectionInfoProps> = ({
  onCollectionSelect,
  collectionChain,
  minting,
}) => {
  const getButtonClass = (chain: CollectionChain) => {
    let baseClass =
      "flex items-center justify-center bg-gray-100 px-5 py-2 shadow-sm hover:shadow-lg rounded cursor-pointer transition-shadow duration-200 border-solid border-2";
    if (chain === collectionChain) {
      baseClass += " border-indigo-500"; // Add your active class here
    }
    return baseClass;
  };

  return (
    <>
      <div className="sm:col-span-3 flex flex-col space-3">
        <h2>
          Test out crosschain payments. This demo allows you to mint from three
          different collections. Pick a chain below to get started.{" "}
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => onCollectionSelect("solana")}
            className={getButtonClass("solana")}
          >
            <SolanaFull />
          </button>
          <button
            onClick={() => onCollectionSelect("base")}
            className={getButtonClass("base")}
          >
            <BaseFull />
          </button>
          <button
            onClick={() => onCollectionSelect("polygon")}
            className={getButtonClass("polygon")}
          >
            <PolygonFull />
          </button>
        </div>

        <CollectionImage collectionChain={collectionChain} />

        {/* <div className="justify-between p-5 my-6 space-y-3 rounded-lg border">
          <p className="text-sm text-black font-bold">
            This is a test collection
          </p>
          <p className="text-sm text-black ">
            You can test out the purchase experience by using the test credit
            card below and enter random information for other payment details.
          </p>
          <div className="w-full p-2 border rounded-lg">
            <div className="cursor-pointer flex items-start gap-1 text-black justify-between">
              <p className="text-black text-sm">4242 4242 4242 4242</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default CollectionInfo;
