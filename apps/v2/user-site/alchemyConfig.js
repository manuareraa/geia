import { cookieStorage, createConfig } from "@alchemy/aa-alchemy/config";
import { polygonAmoy } from "@alchemy/aa-core";
import { QueryClient } from "@tanstack/react-query";

// [!region create-accounts-config]
// NOTE: feel free to change the chain here!
export const chain = polygonAmoy;
// export const config = createConfig({
//   rpcUrl: "http://localhost:5000/api/rpc/chain/" + chain.id,
//   signerConnection: {
//     rpcUrl: "http://localhost:5000/api/rpc/signer/",
//   },
//   chain,
//   ssr: true,
//   storage: cookieStorage,
// });
export const config = createConfig({
  rpcUrl: "http://localhost:3000/api/rpc/chain/" + chain.id,
  signerConnection: {
    rpcUrl: "http://localhost:3000/api/rpc",
  },
  chain,
  ssr: true,
  storage: cookieStorage,
});

// [!endregion create-accounts-config]

// [!region other-config-vars]
// provide a query client for use by the alchemy accounts provider
export const queryClient = new QueryClient();
// configure the account type we wish to use once
export const accountType = "MultiOwnerModularAccount"; // no need to specify SupportedAccountTypes
// setup the gas policy for sponsoring transactions
export const gasManagerConfig = {
  policyId: "beb74d20-9f18-439a-8672-66c6f6e54f60",
};
export const accountClientOptions = {
  txMaxRetries: 20,
};
