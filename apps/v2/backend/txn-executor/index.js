const {
  DynamoDBClient,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
  PutCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  marshall,
  unmarshall,
} = require("@aws-sdk/lib-dynamodb");
const { ethers, JsonRpcProvider } = require("ethers");
const { Alchemy, Network } = require("alchemy-sdk");
// import and configure env
const dotenv = require("dotenv");
dotenv.config();

// Initialize AWS SDK clients
const client = new DynamoDBClient({
  region: "eu-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}); // Replace with your desired region
const dynamoDB = DynamoDBDocumentClient.from(client);
const archiveTable = "txns-archive";
const liveTable = "txns-live";

// Environment variables
const ALCHEMY_API_URL =
  process.env.ALCHEMY_API_URL ||
  "https://polygon-amoy.g.alchemy.com/v2/xrOFTJtcS1QwE5XhDPooc_JHliX828ks";
const PARENT_ACCOUNT_PRIVATE_KEY =
  process.env.PARENT_ACCOUNT_PRIVATE_KEY ||
  "76770b4b5c69a793883a20b26c266cb573d5cf95d5d8b81b9d07e1ed2d6f9fff";
const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0x4bB2CD9D264f5B21bb53aDa2af6753dAc8dDF37c";
const ALCHEMY_API_KEY =
  process.env.ALCHEMY_API_KEY || "xrOFTJtcS1QwE5XhDPooc_JHliX828ks";

// contract ABI
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

const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(settings);

console.log("Starting transaction executor");

// Function to process transactions
async function processTransactions() {
  const logs = [];
  console.log(`Process started at ${new Date().toISOString()}`);

  // Fetch transactions with status "waiting" and retryCount <= 4
  //   const params = {
  //     TableName: liveTable,
  //     FilterExpression: "#status = :waiting and #retryCount <= :retryLimit",
  //     ExpressionAttributeNames: {
  //       "#status": "status",
  //       "#retryCount": "retryCount",
  //     },
  //     ExpressionAttributeValues: {
  //       ":waiting": "waiting",
  //       ":retryLimit": 4,
  //     },
  //   };

  const result = await dynamoDB.send(
    new ScanCommand({
      TableName: liveTable,
      FilterExpression: "#st = :waiting and #rc <= :retryLimit",
      ExpressionAttributeNames: {
        "#st": "status",
        "#rc": "retryCount",
        "#txnId": "txnId",
        "#fa": "fromAddress",
        "#ta": "toAddress",
        "#tid": "tokenId",
        "#qty": "qty",
        "#tt": "txnType",
      },
      ExpressionAttributeValues: {
        ":waiting": { S: "waiting" },
        ":retryLimit": { N: "4" },
      },
      ProjectionExpression: "#txnId, #st, #rc, #fa, #ta, #tid, #qty, #tt",
    })
  );

  const txns = result.Items ? result.Items.map((item) => unmarshall(item)) : [];
  console.log(`Found ${txns.length} transactions to process`);

  if (!txns.length) {
    console.log("No transactions to process");
    console.log(logs.join("\n"));
    return;
  }

  // Prepare arrays for batchTransferMultipleTokenIds
  const fromAddresses = [];
  const toAddresses = [];
  const tokenIds = [];
  const amounts = [];
  const txnIds = [];

  for (const txn of txns) {
    const { txnType, fromAddress, toAddress, tokenId, qty, txnId } = txn;

    if (txnType === "redeem") {
      // Check if already redeemed
      const redeemCheckParams = {
        TableName: archiveTable,
        FilterExpression: "#ta = :toAddress and #tid = :tokenId",
        ExpressionAttributeNames: {
          "#ta": "toAddress",
          "#tid": "tokenId",
        },
        ExpressionAttributeValues: marshall({
          ":toAddress": toAddress,
          ":tokenId": tokenId,
        }),
      };

      const redeemCheckResult = await dynamoDB.send(
        new ScanCommand(redeemCheckParams)
      );
      const redeemedItems = redeemCheckResult.Items
        ? redeemCheckResult.Items.map((item) => unmarshall(item))
        : [];

      if (redeemedItems.length) {
        logs.push(`Transaction already redeemed for ${toAddress}-${tokenId}`);
        await dynamoDB.send(
          new DeleteCommand({
            TableName: liveTable,
            Key: marshall({ txnId }),
          })
        );
        continue;
      }
    }

    fromAddresses.push(fromAddress);
    toAddresses.push(toAddress);
    tokenIds.push(tokenId);
    amounts.push(qty);
    txnIds.push(txnId);
  }

  if (!fromAddresses.length) {
    console.log("No valid transactions to process after filtering");
    console.log(logs.join("\n"));
    return;
  }

  try {
    // Estimate gas
    const gasEstimate = await alchemy.core.estimateGas({
      to: CONTRACT_ADDRESS,
      data: contract.interface.encodeFunctionData(
        "batchTransferMultipleTokenIds",
        [fromAddresses, toAddresses, tokenIds, amounts, "0x"]
      ),
    });

    const tx = await contract.batchTransferMultipleTokenIds(
      fromAddresses,
      toAddresses,
      tokenIds,
      amounts,
      "0x",
      {
        gasLimit: gasEstimate.mul(2), // Double the gas estimate to ensure quick processing
      }
    );

    await tx.wait();

    for (const txnId of txnIds) {
      const txn = txns.find((t) => t.txnId === txnId);
      txn.status = "success";
      txn.timestamp = new Date().toISOString();
      await dynamoDB.send(
        new PutCommand({
          TableName: archiveTable,
          Item: marshall(txn),
        })
      );

      await dynamoDB.send(
        new DeleteCommand({
          TableName: liveTable,
          Key: marshall({ txnId }),
        })
      );
    }

    // Handle grouped token quantities for successful redeem transactions
    const redeemGroups = txns
      .filter((txn) => txn.txnType === "redeem" && txn.status === "success")
      .reduce((acc, txn) => {
        acc[txn.tokenId] = (acc[txn.tokenId] || 0) + txn.qty;
        return acc;
      }, {});

    for (const [tokenId, tokenQty] of Object.entries(redeemGroups)) {
      await fetch(
        "https://admin.api.geoblocs.com/admin/content/update-claimed-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId, tokenQty }),
        }
      );
    }
  } catch (error) {
    console.log(`Batch transaction failed: ${error.message}`);
    for (const txnId of txnIds) {
      const txn = txns.find((t) => t.txnId === txnId);
      txn.retryCount += 1;
      if (txn.retryCount > 4) {
        txn.status = "drop";
        txn.timestamp = new Date().toISOString();
        await dynamoDB.send(
          new PutCommand({
            TableName: archiveTable,
            Item: marshall(txn),
          })
        );
        await dynamoDB.send(
          new DeleteCommand({
            TableName: liveTable,
            Key: marshall({ txnId }),
          })
        );
      } else {
        await dynamoDB.send(
          new UpdateCommand({
            TableName: liveTable,
            Key: marshall({ txnId }),
            UpdateExpression: "set #rc = :retryCount",
            ExpressionAttributeNames: {
              "#rc": "retryCount",
            },
            ExpressionAttributeValues: marshall({
              ":retryCount": txn.retryCount,
            }),
          })
        );
      }
    }
  }

  console.log(logs.join("\n"));
}

// Run the processTransactions function every 5 seconds
setInterval(processTransactions, 5000);
