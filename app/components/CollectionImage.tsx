import React from "react";
import Image from "next/image";
import { CollectionChain } from "../page";

interface CollectionImageProps {
  collectionChain: CollectionChain;
}

const CollectionImage: React.FC<CollectionImageProps> = ({
  collectionChain,
}) => {
  const getImageSrc = (chain: CollectionChain) => {
    switch (chain) {
      case "solana":
        return "/solana-coin.jpg";
      case "ethereum":
        return "/ethereum-coin.jpg";
      case "polygon":
        return "/polygon-coin.jpg";
      default:
        return "/solana-coin.jpg";
    }
  };

  return (
    <Image
      src={getImageSrc(collectionChain)}
      width={500}
      height={500}
      className="rounded-lg shrink"
      alt="nft collection image"
      priority={true}
    />
  );
};

export default CollectionImage;
