This project demonstrates using Crossmint's embedded NFT checkout with cross-chain crypto payments. In this example ~ethers v5~ dynamic.xyz is used to connect the browser wallet.

## Getting Started

Setup a local environment file by using the `env.sample` as a template or simply copy the below into a new file named `.env.local`.

> Note that the Crossmint `projectId` and `collectionId` values are **not** sensitive and can be shared to the client.

```
NEXT_PUBLIC_PROJECT_ID="42c43e55-f92d-4b25-bc99-d8309b6e1f38"
NEXT_PUBLIC_COLLECTION_ID="f992e52c-afaa-46d5-9fba-214754383d0c"
NEXT_PUBLIC_ENVIRONMENT="staging"
```

Clone this repository and install dependencies:

```bash
git clone git@github.com:Crossmint/embedded-crosschain-dynamic.git

cd embedded-crosschain-dynamic

pnpm install
```

Also, this demo is using a local copy of the SDK so be sure to open `package.json` and set that to match the path on your system.

Run the app locally:

```bash
pnpm dev
```

Connect your wallet, set a destination wallet and click the Pay button.

> Once the payment process has started the send ETH transaction takes about 10 seconds to complete before the SDK proceeds to the minting step. You should consider adding a more informative UI during this step.
