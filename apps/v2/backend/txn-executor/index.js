const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
  PutCommand,
  DynamoDBDocumentClient,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb"); // Correct import
const { ethers, JsonRpcProvider } = require("ethers");
const { Alchemy, Network, Utils } = require("alchemy-sdk");

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

// Convert DynamoDBClient to DynamoDBDocumentClient
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
  process.env.CONTRACT_ADDRESS || "0x7B19c50dCa19910baCd1dc69E34Faa965075FcfB";
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

const logFileName = generateLogFileName();
const logFilePath = path.join(__dirname, logFileName);

function logMessage(message) {
  const logEntry = `${new Date().toISOString()} - ${message}\n`;
  console.log(logEntry.trim());
  fs.appendFileSync(logFilePath, logEntry, "utf8");
}

function generateLogFileName() {
  const date = new Date();
  const dateString = date
    .toISOString()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-"); // dd-mm-yyyy format
  const randomString = crypto.randomBytes(4).toString("hex"); // Generate a random 8 character string
  return `${dateString}--${randomString}.logs`;
}

console.log("Starting transaction executor");

async function processTransactions() {
  const logs = [];
  logMessage(`Process started at ${new Date().toISOString()}`);

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
        ":waiting": "waiting",
        ":retryLimit": 4,
      },
      ProjectionExpression: "#txnId, #st, #rc, #fa, #ta, #tid, #qty, #tt",
    })
  );

  const txns = result.Items ? result.Items : [];
  logMessage(`Found ${txns.length} transactions to process`);

  if (!txns.length) {
    logMessage("No transactions to process");
    logMessage(logs.join("\n"));
    setTimeout(processTransactions, 5000);
    return;
  }

  const fromAddresses = [];
  const toAddresses = [];
  const tokenIds = [];
  const amounts = [];
  const txnIds = [];

  for (const txn of txns) {
    const { txnType, fromAddress, toAddress, tokenId, qty, txnId } = txn;

    if (txnType === "redeem") {
      const redeemCheckParams = {
        TableName: archiveTable,
        FilterExpression:
          "#ta = :toAddress and #tid = :tokenId and #tt = :txnType",
        ExpressionAttributeNames: {
          "#ta": "toAddress",
          "#tid": "tokenId",
          "#tt": "txnType",
        },
        ExpressionAttributeValues: {
          ":toAddress": toAddress,
          ":tokenId": parseInt(tokenId),
          ":txnType": "redeem",
        },
        ProjectionExpression: "#ta, #tid, #tt",
      };

      try {
        const redeemCheckResult = await dynamoDB.send(
          new ScanCommand(redeemCheckParams)
        );

        if (redeemCheckResult.Items && redeemCheckResult.Items.length > 0) {
          logMessage(
            `Duplicate redemption detected for ${toAddress}-${tokenId}. Transaction will be deleted.`
          );
          logs.push(`Transaction already redeemed for ${toAddress}-${tokenId}`);

          const deleteCommandParams = {
            TableName: liveTable,
            Key: {
              txnId: txnId,
            },
          };

          await dynamoDB.send(new DeleteCommand(deleteCommandParams));

          txn.status = "duplicate";
          txn.timestamp = new Date().toISOString();

          await dynamoDB.send(
            new PutCommand({
              TableName: archiveTable,
              Item: {
                ...txn,
                txnId: txn.txnId.toString(),
              },
            })
          );

          logMessage(`Transaction ${txnId} deleted from live table.`);
          continue;
        } else {
          logMessage(
            `No prior redemption found for ${toAddress}-${tokenId}. Proceeding with the transaction.`
          );
        }
      } catch (error) {
        logMessage(`Error during redeem check: ${error.message}`);
        throw error;
      }

      logMessage(`Redeem check process completed for txnId: ${txnId}`);
    }

    fromAddresses.push(fromAddress);
    toAddresses.push(toAddress);
    tokenIds.push(Number(tokenId));
    amounts.push(Number(qty));
    txnIds.push(txnId);
  }

  if (!fromAddresses.length) {
    logMessage("No valid transactions to process after filtering");
    logMessage(logs.join("\n"));
    setTimeout(processTransactions, 5000);
    return;
  }

  try {
    const gasEstimate = await alchemy.core.estimateGas({
      to: CONTRACT_ADDRESS,
      data: contract.interface.encodeFunctionData(
        "batchTransferMultipleTokenIds",
        [fromAddresses, toAddresses, tokenIds, amounts, "0x"]
      ),
    });

    logMessage(`Estimated gas: ${gasEstimate.toString()}`);

    const gasLimit = gasEstimate.mul(2);

    logMessage(`Gas limit: ${gasLimit.toString()}`);

    logMessage(
      "The gas cost estimation for the above tx is: " +
        Utils.formatUnits(gasEstimate, "ether") +
        " ether"
    );

    const tx = await contract.batchTransferMultipleTokenIds(
      fromAddresses.slice(0, 1),
      toAddresses.slice(0, 1),
      tokenIds.slice(0, 1),
      amounts.slice(0, 1),
      "0x"
    );

    logMessage(`Sending txn with hash: ${tx.hash}`);

    await tx.wait();

    logMessage(`Transaction mined: ${tx.hash}`);

    for (const txnId of txnIds) {
      const txn = txns.find((t) => t.txnId === txnId);
      txn.status = "success";
      txn.timestamp = new Date().toISOString();

      logMessage(`Processing transaction ${txnId}`);

      await dynamoDB.send(
        new PutCommand({
          TableName: archiveTable,
          Item: {
            ...txn,
            txnId: txn.txnId.toString(),
          },
        })
      );

      logMessage(`Transaction ${txnId} archived`);

      await dynamoDB.send(
        new DeleteCommand({
          TableName: liveTable,
          Key: {
            txnId: txnId,
          },
        })
      );
    }

    logMessage("Transactions entries updated in DynamoDB");

    const redeemGroups = txns
      .filter((txn) => txn.txnType === "redeem" && txn.status === "success")
      .reduce((acc, txn) => {
        const key = `${txn.tokenId}-${txn.sponsorId}`;
        acc[key] = acc[key] || {
          tokenId: txn.tokenId,
          sponsorId: txn.sponsorId,
          qty: 0,
        };
        acc[key].qty += txn.qty;
        return acc;
      }, {});

    for (const group of Object.values(redeemGroups)) {
      const { tokenId, sponsorId, qty: tokenQty } = group;
      await fetch(
        "https://admin.api.geoblocs.com/admin/content/update/sponsor/claimed-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId, sponsorId, qty: tokenQty }),
        }
      );
    }

    logMessage("Sponsor claimed tokens updated");
  } catch (error) {
    logMessage(`Batch transaction failed: ${error.message}`);
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

  logMessage(logs.join("\n"));
  return processTransactions();
}

processTransactions();
