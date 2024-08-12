import AWS from "aws-sdk";
import { ethers, JsonRpcProvider } from "ethers";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// Initialize AWS SDK clients
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Environment variables
const ALCHEMY_API_URL =
  process.env.ALCHEMY_API_URL ||
  "https://polygon-amoy.g.alchemy.com/v2/xrOFTJtcS1QwE5XhDPooc_JHliX828ks";
const PARENT_ACCOUNT_ADDRESS =
  process.env.PARENT_ACCOUNT_ADDRESS ||
  "0x3F6f50314f5e3A282ddBa77102711979f634A08b";
const PARENT_ACCOUNT_PRIVATE_KEY =
  process.env.PARENT_ACCOUNT_PRIVATE_KEY ||
  "76770b4b5c69a793883a20b26c266cb573d5cf95d5d8b81b9d07e1ed2d6f9fff";
const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0x7B19c50dCa19910baCd1dc69E34Faa965075FcfB";
// 0x4bB2CD9D264f5B21bb53aDa2af6753dAc8dDF37c

const ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "from",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "to",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "batchTransferMultipleTokenIds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "to",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "batchTransferSingleToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "burnBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC1155InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC1155InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idsLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "valuesLength",
        type: "uint256",
      },
    ],
    name: "ERC1155InvalidArrayLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC1155InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC1155InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC1155InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC1155MissingApprovalForAll",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newuri",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getTokenIdsAndBalances",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Set up Alchemy provider and contract
const provider = new JsonRpcProvider(ALCHEMY_API_URL);
const signer = new ethers.Wallet(PARENT_ACCOUNT_PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

const verifyToken = (event) => {
  const token = event.headers.Authorization || "";
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

// Helper function to log and return a response
const logAndRespond = (statusCode, message, logs, additionalData = {}) => {
  const response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({
      message: message,
      logs: logs,
      ...additionalData,
    }),
  };
  console.log(response);
  return response;
};

// Schema validation for /add-txn
const schema = Joi.object({
  toAddress: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .required(),
  amount: Joi.number().positive().required(),
  tokenId: Joi.number().positive().required(),
  sponsorId: Joi.string().uuid().required(),
});

// Lambda handler function
export const handler = async (event) => {
  const logs = [];
  logs.push(`Received event: ${JSON.stringify(event)}`);

  // try {
  //   verifyToken(event);
  // } catch (error) {
  //   logs.push("Unauthorized");
  //   return logAndRespond(401, "Unauthorized", logs);
  // }

  switch (true) {
    case event.path === "/bc/add-txn" && event.httpMethod === "POST":
      return await handleAddTxn(event, logs);
    case event.path === "/bc/token/fetch-onchain-token-data" &&
      event.httpMethod === "GET":
      return await handleFetchOnchainTokenData(event, logs);
    case event.path.startsWith("/bc/api/rpc/") && event.httpMethod === "POST":
      return await handleAlchemySignerRequests(event, logs);
    case event.path.startsWith("/bc/api/rpc/chain/") &&
      event.httpMethod === "POST":
      return await handleChainRpcRequests(event, logs);
    case event.path === "/bc/token/verify-balance" &&
      event.httpMethod === "GET":
      return await handleVerifyTokenBalance(event, logs);
    case event.path === "/bc/token/summary" && event.httpMethod === "GET":
      return await handleTokenSummary(event, logs);
    default:
      logs.push("Invalid path or method");
      return logAndRespond(400, "Invalid path or method", logs);
  }
};

const handleTokenSummary = async (event, logs) => {
  const queryStringParameters = event.queryStringParameters || {};
  const { address } = queryStringParameters;

  if (!address) {
    logs.push("Missing address query parameter");
    return logAndRespond(400, "Missing address query parameter", logs);
  }

  try {
    // Fetch token IDs and balances from the smart contract
    const [tokenIds, balances] = await contract.getTokenIdsAndBalances(address);
    logs.push(
      `Token IDs and balances for address ${address}: ${tokenIds}, ${balances}`
    );

    // Convert BigInt tokenIds and balances to strings
    const tokenIdsAsStrings = tokenIds.map((id) => parseInt(id.toString()));
    const balancesAsStrings = balances.map((balance) => balance.toString());

    // Make API request to the wallet-summary endpoint
    const response = await fetch(
      "https://admin.api.geoblocs.com/admin/content/wallet-summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenIds: [...tokenIdsAsStrings], // Use the stringified tokenIds here
          tokenBalances: [...balancesAsStrings], // Use the stringified balances here
        }),
      }
    );

    console.log("Response: ", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch wallet summary: ${response.statusText}`);
    }

    const summary = await response.json();
    logs.push(`Fetched wallet summary: ${JSON.stringify(summary)}`);

    // Return the summary to the frontend
    return logAndRespond(200, "Fetched token summary successfully", logs, {
      summary: summary,
    });
  } catch (error) {
    logs.push(`Error fetching token summary: ${error.message}`);
    return logAndRespond(500, "Error fetching token summary", logs);
  }
};

const handleVerifyTokenBalance = async (event, logs) => {
  const queryStringParameters = event.queryStringParameters || {};
  const { address, tokenId } = queryStringParameters;

  if (!address || !tokenId) {
    logs.push("Missing address or tokenId query parameter");
    return logAndRespond(
      400,
      "Missing address or tokenId query parameter",
      logs
    );
  }

  try {
    const balance = await contract.balanceOf(address, tokenId);
    logs.push(
      `Balance for address ${address} for tokenId ${tokenId}: ${balance.toString()}`
    );

    return logAndRespond(200, "Fetched token balance successfully", logs, {
      balance: balance.toString(),
    });
  } catch (error) {
    logs.push(`Error fetching token balance: ${error.message}`);
    return logAndRespond(500, "Error fetching token balance", logs);
  }
};

const handleAddTxn = async (event, logs) => {
  const body = JSON.parse(event.body);

  // Validate and sanitize input
  const { error, value } = schema.validate(body);
  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.details[0].message }),
    };
  }

  const { toAddress, amount, tokenId, sponsorId } = value;
  const txnId = uuidv4();
  const createdAt = new Date().toISOString();

  const item = {
    txnId,
    toAddress,
    amount,
    tokenId,
    status: "notProcessed",
    createdAt,
    completedAt: null,
    txnHash: null,
    sponsorId,
  };

  const params = {
    TableName: "blockchain-txns",
    Item: item,
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Transaction added successfully",
        txnId,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to add transaction",
        error: error.message,
      }),
    };
  }
};

const handleFetchOnchainTokenData = async (event, logs) => {
  const queryStringParameters = event.queryStringParameters || {};
  const { tokenId } = queryStringParameters;

  if (!tokenId) {
    logs.push("Missing tokenId query parameter");
    return logAndRespond(400, "Missing tokenId query parameter", logs);
  }

  try {
    logs.push(
      `Fetching on-chain token data for tokenId ${tokenId} ${typeof tokenId}`
    );
    // const totalSupply = await contract.totalSupply(tokenId);
    const totalSupply = await contract["totalSupply(uint256)"](tokenId);
    logs.push(`Total supply for tokenId ${tokenId}: ${totalSupply.toString()}`);

    const balance = await contract.balanceOf(PARENT_ACCOUNT_ADDRESS, tokenId);
    logs.push(
      `Balance for parent account ${PARENT_ACCOUNT_ADDRESS} for tokenId ${tokenId}: ${balance.toString()}`
    );

    return logAndRespond(
      200,
      "Fetched on-chain token data successfully",
      logs,
      {
        totalSupply: totalSupply.toString(),
        balance: balance.toString(),
      }
    );
  } catch (error) {
    logs.push(`Error fetching on-chain token data: ${error.message}`);
    return logAndRespond(500, "Error fetching on-chain token data", logs);
  }
};

const handleAlchemySignerRequests = async (event, logs) => {
  const apiKey =
    process.env.ALCHEMY_API_KEY || "jIxllEB917SPw8x-TnXNpSLqScKmVhko";
  const apiUrl = "https://api.g.alchemy.com";
  const body = JSON.parse(event.body);
  const routes = event.path.replace("/api/rpc/", "");

  if (!apiKey) {
    return logAndRespond(500, "ALCHEMY_API_KEY is not set", logs);
  }

  try {
    const response = await fetch(`${apiUrl}/${routes}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      return logAndRespond(
        response.status,
        "Failed to fetch data",
        logs,
        errorResult
      );
    }

    const result = await response.json();
    return logAndRespond(200, "Request successful", logs, result);
  } catch (error) {
    logs.push(`Error: ${error.message}`);
    return logAndRespond(500, "Internal Server Error", logs);
  }
};

const handleChainRpcRequests = async (event, logs) => {
  const hardcodedChainId = 80002;
  const chain = getChain(hardcodedChainId);

  if (!chain) {
    return logAndRespond(404, `Chain not found: ${hardcodedChainId}`, logs);
  }

  const rpcUrl = chain.rpcUrls.alchemy.http[0];
  const apiKey =
    process.env.ALCHEMY_API_KEY || "jIxllEB917SPw8x-TnXNpSLqScKmVhko";
  const body = JSON.parse(event.body);

  if (!apiKey) {
    return logAndRespond(500, "ALCHEMY_API_KEY is not set", logs);
  }

  try {
    const apiResponse = await fetch(`${rpcUrl}/${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorResult = await apiResponse
        .json()
        .catch(() => ({ message: "Failed to fetch data" }));
      return logAndRespond(
        apiResponse.status,
        "Failed to fetch data",
        logs,
        errorResult
      );
    }

    const result = await apiResponse.json();
    return logAndRespond(200, "Request successful", logs, result);
  } catch (error) {
    logs.push(`Error: ${error.message}`);
    return logAndRespond(500, "Internal Server Error", logs);
  }
};

// Helper function to get chain information
const getChain = (chainId) => {
  const chains = {
    80002: {
      name: "Polygon Testnet",
      rpcUrls: {
        alchemy: {
          http: ["https://polygon-mumbai.g.alchemy.com/v2"],
        },
      },
    },
    // Add other chains as needed
  };

  return chains[chainId] || null;
};
