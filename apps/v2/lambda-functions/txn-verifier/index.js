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
  qty: Joi.number().positive().required(),
  toAddress: Joi.string().required(),
};

const buySchema = Joi.object({
  ...baseSchema,
  txnType: Joi.string().valid("buy").required(),
  fromAddress: Joi.string().valid("0xJHB16526554S24SD26351SDGSDV").required(),
  tokenId: Joi.number().positive().required(),
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
  fromAddress: Joi.string().valid("0xJHB16526554S24SD26351SDGSDV").required(),
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
      console.log("Verification for buy transaction");
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

  if (!authResponse.ok) {
    throw new Error(
      `Failed to obtain PayPal access token: ${authResponse.statusText}`
    );
  }

  const authData = await authResponse.json();
  const accessToken = authData.access_token;

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

  if (!orderResponse.ok) {
    throw new Error(
      `Failed to verify PayPal order: ${orderResponse.statusText}`
    );
  }

  const orderData = await orderResponse.json();

  // Check first level custom_id
  let customIdField = orderData.purchase_units?.[0]?.custom_id;

  // If not found at first level, check inside captures
  if (!customIdField) {
    customIdField =
      orderData.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id || "{}";
  }

  const customIdData = JSON.parse(customIdField);
  const { tokenId, tokenQty } = customIdData;

  if (txnObject.tokenId !== tokenId || txnObject.qty !== tokenQty) {
    throw new Error(
      "PayPal order verification failed: Token ID or quantity mismatch"
    );
  }

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
