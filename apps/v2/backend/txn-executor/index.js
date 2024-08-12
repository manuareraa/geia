const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
  PutCommand,
  DynamoDBDocumentClient,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

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
        ":waiting": "waiting", // String type
        ":retryLimit": 4, // Number type
      },
      ProjectionExpression: "#txnId, #st, #rc, #fa, #ta, #tid, #qty, #tt",
    })
  );

  // Log raw items before unmarshalling
  //   console.log("Raw items from DynamoDB:", result.Items);

  //   const txns = result.Items
  //     ? result.Items.map((item) => {
  //         try {
  //           return unmarshall(item);
  //         } catch (error) {
  //           console.error("Error unmarshalling item:", item, error);
  //           return null; // Handle error or skip the item
  //         }
  //       }).filter((item) => item !== null)
  //     : [];

  //   console.log("Processed transactions:", txns);
  //   const txns = result.Items ? result.Items.map((item) => unmarshall(item)) : [];
  // Since the data is already in the correct format, just use it directly
  const txns = result.Items ? result.Items : [];
  //   console.log("txns", txns);
  //   console.log("txns length", txns.length);
  console.log(`Found ${txns.length} transactions to process`);

  if (!txns.length) {
    console.log("No transactions to process");
    console.log(logs.join("\n"));
    setTimeout(processTransactions, 5000);
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
        ProjectionExpression: "#ta, #tid, #tt", // Optionally include txnType in the projection
      };

      try {
        const redeemCheckResult = await dynamoDB.send(
          new ScanCommand(redeemCheckParams)
        );

        if (redeemCheckResult.Items && redeemCheckResult.Items.length > 0) {
          console.log(
            `Duplicate redemption detected for ${toAddress}-${tokenId}. Transaction will be deleted.`
          );
          logs.push(`Transaction already redeemed for ${toAddress}-${tokenId}`);

          const deleteCommandParams = {
            TableName: liveTable,
            Key: {
              txnId: txnId, // Correctly format the key as a string
            },
          };

          await dynamoDB.send(new DeleteCommand(deleteCommandParams));

          txn.status = "duplicate";
          txn.timestamp = new Date().toISOString();

          // Put command to insert the transaction into the archive table
          await dynamoDB.send(
            new PutCommand({
              TableName: archiveTable,
              Item: {
                ...txn,
                txnId: txn.txnId.toString(), // Ensure txnId is correctly treated as a string
              },
            })
          );

          console.log(`Transaction ${txnId} deleted from live table.`);
          continue;
        } else {
          console.log(
            `No prior redemption found for ${toAddress}-${tokenId}. Proceeding with the transaction.`
          );
        }
      } catch (error) {
        console.error("Error during redeem check:", error);
        throw error;
      }

      console.log("Redeem check process completed for txnId:", txnId);
    }

    fromAddresses.push(fromAddress);
    toAddresses.push(toAddress);
    tokenIds.push(Number(tokenId));
    amounts.push(Number(qty));
    txnIds.push(txnId);
  }

  //   console.log("fromAddresses", fromAddresses);
  //   console.log("toAddresses", toAddresses);
  //   console.log("tokenIds", tokenIds);
  //   console.log("amounts", amounts);
  //   console.log("txnIds", txnIds);

  if (!fromAddresses.length) {
    console.log("No valid transactions to process after filtering");
    console.log(logs.join("\n"));
    setTimeout(processTransactions, 5000);
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

    console.log(`Estimated gas: ${gasEstimate.toString()}`);

    // Convert gasLimit to a BigNumber and ensure it's in the correct format
    const gasLimit = gasEstimate.mul(2);

    console.log(`Gas limit: ${gasLimit.toString()}`);

    console.log(
      "The gas cost estimation for the above tx is: " +
        Utils.formatUnits(gasEstimate, "ether") +
        " ether"
    );

    // return

    const tx = await contract.batchTransferMultipleTokenIds(
      fromAddresses.slice(0, 1),
      toAddresses.slice(0, 1),
      tokenIds.slice(0, 1),
      amounts.slice(0, 1),
      "0x"
      //   {
      //     gasLimit: gasLimit.toString(), // Double the gas estimate to ensure quick processing
      //   }
    );

    console.log(`Sending txn with hash: ${tx.hash}`);

    await tx.wait();

    console.log(`Transaction mined: ${tx.hash}`);

    // Deletes the entry from the live table and adds it to the archive table
    for (const txnId of txnIds) {
      const txn = txns.find((t) => t.txnId === txnId);
      txn.status = "success";
      txn.timestamp = new Date().toISOString();

      console.log(`Processing transaction ${txnId}`);

      // Put command to insert the transaction into the archive table
      await dynamoDB.send(
        new PutCommand({
          TableName: archiveTable,
          Item: {
            ...txn,
            txnId: txn.txnId.toString(), // Ensure txnId is correctly treated as a string
          },
        })
      );

      console.log(`Transaction ${txnId} archived`);

      // Delete command to remove the transaction from the live table
      await dynamoDB.send(
        new DeleteCommand({
          TableName: liveTable,
          Key: {
            txnId: txnId, // Directly use txnId, assuming it is already a string
          },
        })
      );
    }

    console.log("Transactions entries updated in DynamoDB");

    // If txnType is redeem, update sponsor claimed token by grouping them together
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

    console.log("Sponsor claimed tokens updated");
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
  return processTransactions(); // Call again to continue processing
}

processTransactions();
