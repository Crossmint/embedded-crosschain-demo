import React from "react";

interface ButtonProps {
  env: string;
  chain: string;
  token: any;
}

const getNetwork = (chain: string, env: string) => {
  switch (chain) {
    case "polygon":
      return env === "staging" ? "mumbai" : "polygon";
    case "solana":
      return env === "staging" ? "mumbai" : "solana";
    case "base":
      return env === "staging" ? "base-sepolia" : "base";
  }
};

const OpenSeaButton: React.FC<ButtonProps> = ({ env, chain, token }) => {
  const subdomain = env === "staging" ? "testnets." : "";
  const network = getNetwork(chain, env);

  return (
    <a
      target="_blank"
      className="block bg-[#2081e2] rounded-lg mt-3 p-3 text-white"
      href={`https://${subdomain}opensea.io/assets/${network}/${token?.contractAddress}/${token?.tokenIds[0]}`}
    >
      View on OpenSea
    </a>
  );
};

const ScannerButton: React.FC<ButtonProps> = ({ env, chain, token }) => {
  let scannerLink, label, color;
  switch (chain) {
    case "solana":
      const network = env === "staging" ? "devnet" : "mainnet";
      scannerLink = `https://xray.helius.xyz/token/${token?.mintHash}?network=${network}`;
      label = "XRAY";
      color = "#ef7235";
      break;
    case "base":
      const subdomain = env === "staging" ? "sepolia." : "";
      scannerLink = `https://${subdomain}basescan.org/tx/${token?.txId}`;
      label = "Basescan";
      color = "#1554f0";
      break;
    case "polygon":
      scannerLink = ``;
      label = "Polygonscan";
      color = "#663399";
      break;
  }

  return (
    <a
      target="_blank"
      className={`block bg-[${color}] rounded-lg mt-3 p-3 text-white`}
      href={scannerLink}
    >
      View on {label}
    </a>
  );
};

const CrossmintButton: React.FC<ButtonProps> = ({ env, chain, token }) => {
  return (
    <a
      target="_blank"
      className="block bg-[#663399] rounded-lg mt-3 p-3 text-white"
      href={`https://mumbai.polygonscan.com/tx/${token?.txId}`}
    >
      View on Polygonscan
    </a>
  );
};

export { OpenSeaButton, ScannerButton, CrossmintButton };