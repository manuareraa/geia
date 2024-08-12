import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// Initialize AWS SDK clients
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Environment variables
const DYNAMODB_TABLE = "txns-live";

// Schema validation for different transaction types
const baseSchema = {
  txnType: Joi.string().valid("buy", "transfer", "redeem").required(),
  qty: Joi.number().required(),
  toAddress: Joi.string().required(),
};

const buySchema = Joi.object({
  ...baseSchema,
  txnType: Joi.string().valid("buy").required(),
  fromAddress: Joi.string()
    .valid("0x3F6f50314f5e3A282ddBa77102711979f634A08b")
    .required(),
  // tokenId: Joi.number().positive().required(),
  tokenId: Joi.number().required(),
  orderId: Joi.string().required(),
}).options({ abortEarly: false });

const transferSchema = Joi.object({
  ...baseSchema,
  txnType: Joi.string().valid("transfer").required(),
  fromAddress: Joi.string().required(),
}).options({ abortEarly: false });

const redeemSchema = Joi.object({
  ...baseSchema,
  txnType: Joi.string().valid("redeem").required(),
  fromAddress: Joi.string()
    .valid("0x3F6f50314f5e3A282ddBa77102711979f634A08b")
    .required(),
  tokenId: Joi.number().required(),
  sponsorId: Joi.string().required(),
}).options({ abortEarly: false });

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

// Lambda handler function
export const handler = async (event) => {
  const logs = [];
  logs.push(`Received event: ${JSON.stringify(event)}`);

  // try {
  //   verifyToken(event);
  // } catch (error) {
  //   logs.push("Unauthorized");
  //   console.log(logs.join("\n"));
  //   return logAndRespond(401, "Unauthorized", logs);
  // }

  switch (true) {
    case event.path === "/verifier/txn/commit" && event.httpMethod === "POST":
      return await handleTxnCommit(event, logs);
      case event.path === "/verifier/txn/waitforcompletion" && event.httpMethod === "GET":
        return await handleCheckTxnStatus(event, logs);      
    default:
      logs.push("Invalid path or method");
      return logAndRespond(400, "Invalid path or method", logs);
  }
};

const handleTxnCommit = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  let schema;
  switch (requestBody.txnType) {
    case "buy":
      schema = buySchema;
      break;
    case "transfer":
      schema = transferSchema;
      break;
    case "redeem":
      schema = redeemSchema;
      break;
    default:
      return logAndRespond(400, "Invalid txnType", logs);
  }

  const { error, value } = schema.validate(requestBody);
  if (error) {
    return logAndRespond(
      400,
      `Validation failed: ${error.details
        .map((detail) => detail.message)
        .join(", ")}`,
      logs
    );
  }

  const txnId = uuidv4();
  const txnObject = { ...value, txnId };

  const params = {
    TableName: DYNAMODB_TABLE,
    Key: { txnId },
  };

  const existingTxn = await dynamoDB.get(params).promise();
  if (existingTxn.Item) {
    return logAndRespond(400, "Transaction with this ID already exists", logs);
  }

  switch (txnObject.txnType) {
    case "buy":
      console.log("Verification for buy transaction", txnObject);
      const { tokenId, tokenQty } = await handleBuyVerification(txnObject);
      delete txnObject.orderId;
      txnObject.tokenId = tokenId;
      txnObject.qty = tokenQty;
      break;
    case "transfer":
      await handleTransferVerification(txnObject, logs);
      break;
    case "redeem":
      console.log("Verification for redeem transaction");
      await handleRedeemVerification(txnObject);
      delete txnObject.sponsorId;
      txnObject.qty = 1;
      break;
  }

  // waiting || pending || drop || success
  txnObject.status = "waiting";
  txnObject.retryCount = 0;

  const putParams = {
    TableName: DYNAMODB_TABLE,
    Item: txnObject,
  };

  try {
    await dynamoDB.put(putParams).promise();
    return logAndRespond(201, "Transaction committed successfully", logs, {
      txnId,
    });
  } catch (error) {
    return logAndRespond(
      500,
      `Failed to commit transaction: ${error.message}`,
      logs
    );
  }
};

const handleBuyVerification = async (txnObject) => {
  console.log("Paypal verification started");
  const CLIENT_ID =
    "AWqMFsrCNIFKrjbGbEyIq2HHBBuGI6O5IRWLfoRgQetGB6CRnkobNytsi8_voGAKG-xxc4CkKjQG-Nmn";
  const SECRET =
    "EEGLQJ1YrzOz8tTmnw5AU0rcpqvx-TdYbayfSyibLlU5SNnyNXMyTfsfMq2y29LTpoZ2GeW8u6tv60s9";
  const authResponse = await fetch(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${SECRET}`).toString(
          "base64"
        )}`,
      },
      body: "grant_type=client_credentials",
    }
  );

  console.log("Auth response:", authResponse);

  if (!authResponse.ok) {
    console.log("Failed to obtain PayPal access token");
    throw new Error(
      `Failed to obtain PayPal access token: ${authResponse.statusText}`
    );
  }

  const authData = await authResponse.json();
  const accessToken = authData.access_token;

  console.log("Access token:", accessToken);

  const orderResponse = await fetch(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${txnObject.orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log("Order response:", orderResponse);

  if (!orderResponse.ok) {
    console.log("Failed to verify PayPal order");
    throw new Error(
      `Failed to verify PayPal order: ${orderResponse.statusText}`
    );
  }

  const orderData = await orderResponse.json();

  console.log("Order data:", orderData);

  // Check first level custom_id
  let customIdField = orderData.purchase_units?.[0]?.custom_id;

  // If not found at first level, check inside captures
  if (!customIdField) {
    customIdField =
      orderData.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id || "{}";
  }

  const customIdData = JSON.parse(customIdField);
  console.log("Custom ID data:", customIdData);

  return customIdData;
};

const handleTransferVerification = async (txnObject, logs) => {
  const verifyBalanceUrl =
    "https://user.api.geoblocs.com/bc/token/verify-balance";
  const response = await fetch(
    `${verifyBalanceUrl}?address=${txnObject.fromAddress}&tokenId=${txnObject.tokenId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to verify balance: ${response.statusText}`);
  }

  const data = await response.json();
  if (txnObject.qty > parseInt(data.balance, 10)) {
    throw new Error("Insufficient balance for transfer");
  }
};

const handleRedeemVerification = async (txnObject) => {
  console.log("Redeem verification started");
  const sponsorId = txnObject.sponsorId;
  const tokenId = txnObject.tokenId;
  const updateSponsorClaimedTokenUrl =
    "https://admin.api.geoblocs.com/admin/content/update/sponsor/claimed-token";
  const response = await fetch(updateSponsorClaimedTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sponsorId, tokenId }),
  });

  console.log("Update sponsor claimed token response:", response);

  // check the response code for 200
  if (!response.ok) {
    throw new Error(
      `Failed to update sponsor claimed token: ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log("Update sponsor claimed token data:", data);

  // if (data.status !== "success") {
  //   throw new Error(`Failed to update sponsor claimed token: ${data.message}`);
  // }

  return data;
};

const handleCheckTxnStatus = async (event, logs) => {
  const { tId } = event.queryStringParameters || {};

  const txnId = tId;

  if (!txnId) {
    logs.push("Missing txnId in the request parameters");
    return logAndRespond(400, "Missing txnId", logs);
  }

  const params = {
    TableName: "txns-archive",
    Key: { txnId },
  };

  try {
    const dbResponse = await dynamoDB.get(params).promise();
    if (!dbResponse.Item) {
      logs.push(`Transaction with txnId: ${txnId} not found`);
      return logAndRespond(204, "Transaction not found", logs);
    }

    const { status } = dbResponse.Item;
    if (status === "success") {
      return logAndRespond(200, "Transaction succeeded", logs);
    } else if (status === "duplicate") {
      logs.push(`Transaction status: ${status}`);
      return logAndRespond(206, "Transaction dropped because of duplicacy", logs);
    } else {
      logs.push(`Transaction status: ${status}`);
      return logAndRespond(205, "Transaction not in success status", logs);
    }
  } catch (error) {
    logs.push(`Error checking transaction status: ${error.message}`);
    return logAndRespond(500, "Error checking transaction status", logs);
  }
};

