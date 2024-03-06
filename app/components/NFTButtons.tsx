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
      return env === "staging" ? "devnet" : "solana";
    case "base":
      return env === "staging" ? "base-sepolia" : "base";
    default:
      return "";
  }
};

const OpenSeaButton: React.FC<ButtonProps> = ({ env, chain, token }) => {
  const subdomain = env === "staging" ? "testnets." : "";
  const network = getNetwork(chain, env);

  return network === "mumbai" ? (
    <a
      target="_blank"
      className="block bg-[#2081e2] rounded-lg mt-3 p-3 text-white"
      href={`https://${subdomain}opensea.io/assets/${network}/${token?.contractAddress}/${token?.tokenIds[0]}`}
    >
      View on OpenSea
    </a>
  ) : null;
};

const ScannerButton: React.FC<ButtonProps> = ({ env, chain, token }) => {
  let scannerLink, label, color;
  switch (chain) {
    case "solana":
      const network = env === "staging" ? "devnet" : "mainnet";
      scannerLink = `https://xray.helius.xyz/tx/${token?.txId}?network=${network}`;
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
      scannerLink = `https://mumbai.polygonscan.com/tx/${token?.txId}`;
      label = "Polygonscan";
      color = "#663399";
      break;
  }

  return (
    <a
      target="_blank"
      style={{ backgroundColor: color }}
      className={`block rounded-lg mt-3 p-3 text-white my-4`}
      href={scannerLink}
    >
      View on {label}
    </a>
  );
};

const RestartButton: React.FC = () => {
  return (
    <a className="block bg-[#98ff98] rounded-lg mt-3 p-3 text-black" href="/">
      Reset and Start Over
    </a>
  );
};

export { OpenSeaButton, ScannerButton, RestartButton };
