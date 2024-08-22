import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as OTPAuth from "otpauth";
import qrcode from "qrcode";
import Joi from "joi";

// Initialize AWS SDK clients
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
const DYNAMODB_TABLE = "admin-users";

// User schema validation
const userSchema = Joi.object({
  emailId: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({ abortEarly: false });

// Helper function to log and return a response
// const logAndRespond = (statusCode, message, logs, additionalData = {}) => {
//   const response = {
//     statusCode: statusCode,
//     body: JSON.stringify({
//       message: message,
//       logs: logs,
//       ...additionalData,
//     }),
//   };
//   console.log(response);
//   return response;
// };

// Helper function to log and return a response
const logAndRespond = (statusCode, message, logs, additionalData = {}) => {
  const response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      // "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Origin": "https://admin.geoblocs.com",
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

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ emailId: user.emailId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

// Verify JWT token
const verifyToken = (event) => {
  const token = event.headers.Authorization || "";
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

// Lambda handler function
export const handler = async (event) => {
  const logs = [];
  logs.push(`Received event: ${JSON.stringify(event)}`);

  switch (true) {
    case event.path === "/admin/user/signup" && event.httpMethod === "POST":
      return await handleSignup(event, logs);
    case event.path === "/admin/user/login" && event.httpMethod === "POST":
      return await handleLogin(event, logs);
    case event.path === "/admin/user/generate-qr" &&
      event.httpMethod === "POST":
      return await handleGenerateQR(event, logs);
    case event.path === "/admin/user/verify-token" &&
      event.httpMethod === "POST":
      return await handleVerifyToken(event, logs);
    case event.path === "/admin/user/auto-login" && event.httpMethod === "GET":
      return await handleAutoLogin(event, logs); // Add this line
    case event.path === "/admin/user/health" && event.httpMethod === "GET":
      return logAndRespond(200, "Healthy", logs);
    default:
      logs.push("Invalid path or method");
      return logAndRespond(400, "Invalid path or method", logs);
  }
};

// Handle user signup
const handleSignup = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = userSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { emailId, password } = requestBody;
  const hashedPassword = await bcrypt.hash(password, 10);

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Item: {
      emailId: emailId,
      password: hashedPassword,
      hasAdminApproval: false, // Initially set to false
    },
  };

  try {
    await dynamoDB.put(dbParams).promise();
    logs.push(`User registered with emailId: ${emailId}`);
    return logAndRespond(201, "User registered successfully", logs);
  } catch (error) {
    logs.push(`Error registering user: ${error.message}`);
    return logAndRespond(500, "Error registering user", logs);
  }
};

// Handle user login
const handleLogin = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = userSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { emailId, password } = requestBody;

  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      emailId: emailId,
    },
  };

  try {
    const dbResponse = await dynamoDB.get(params).promise();
    if (!dbResponse.Item) {
      logs.push("User not found");
      return logAndRespond(404, "User not found", logs);
    }

    const user = dbResponse.Item;
    if (!user.hasAdminApproval) {
      logs.push("Admin approval required");
      return logAndRespond(403, "Admin approval required", logs);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logs.push("Invalid password");
      return logAndRespond(401, "Invalid password", logs);
    }

    const token = generateToken(user);
    logs.push("Login successful");
    return logAndRespond(200, "Login successful", logs, { token });
  } catch (error) {
    logs.push(`Error logging in: ${error.message}`);
    return logAndRespond(500, "Error logging in", logs);
  }
};

// Handle generating QR code for 2FA
const handleGenerateQR = async (event, logs) => {
  try {
    verifyToken(event);
  } catch (error) {
    logs.push("Unauthorized");
    return logAndRespond(401, "Unauthorized", logs);
  }

  const { emailId } = JSON.parse(event.body);
  const secret = new OTPAuth.Secret();

  const totp = new OTPAuth.TOTP({
    issuer: "Geoblocs Admin",
    label: emailId,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret,
  });

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { emailId },
    UpdateExpression: "set totpSecret = :totpSecret",
    ExpressionAttributeValues: {
      ":totpSecret": secret.base32,
    },
  };

  try {
    await dynamoDB.update(dbParams).promise();
    const uri = totp.toString();
    const qrCode = await qrcode.toDataURL(uri);
    logs.push("Generated QR code for 2FA");
    return logAndRespond(200, "QR code generated", logs, { qrCode });
  } catch (error) {
    logs.push(`Error generating QR code: ${error.message}`);
    return logAndRespond(500, "Error generating QR code", logs);
  }
};

// Handle verifying TOTP token for 2FA
const handleVerifyToken = async (event, logs) => {
  try {
    verifyToken(event);
  } catch (error) {
    logs.push("Unauthorized");
    return logAndRespond(401, "Unauthorized", logs);
  }

  const { emailId, token } = JSON.parse(event.body);

  const params = {
    TableName: DYNAMODB_TABLE,
    Key: { emailId },
  };

  try {
    const dbResponse = await dynamoDB.get(params).promise();
    const user = dbResponse.Item;
    if (!user || !user.totpSecret) {
      logs.push("User not found or TOTP not set up");
      return logAndRespond(404, "User not found or TOTP not set up", logs);
    }

    const totp = new OTPAuth.TOTP({
      issuer: "Geoblocs Admin",
      label: emailId,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(user.totpSecret),
    });

    const delta = totp.validate({ token, window: 1 });

    if (delta !== null) {
      logs.push("Token verified successfully");
      return logAndRespond(200, "Token verified successfully", logs);
    } else {
      logs.push("Invalid token");
      return logAndRespond(401, "Invalid token", logs);
    }
  } catch (error) {
    logs.push(`Error verifying token: ${error.message}`);
    return logAndRespond(500, "Error verifying token", logs);
  }
};

// Handle auto-login
const handleAutoLogin = async (event, logs) => {
  try {
    const decoded = verifyToken(event);
    const emailId = decoded.emailId;

    const params = {
      TableName: DYNAMODB_TABLE,
      Key: {
        emailId: emailId,
      },
    };

    const dbResponse = await dynamoDB.get(params).promise();
    if (!dbResponse.Item) {
      logs.push("User not found");
      return logAndRespond(404, "User not found", logs);
    }

    const user = dbResponse.Item;
    if (!user.hasAdminApproval) {
      logs.push("Admin approval required");
      return logAndRespond(403, "Admin approval required", logs);
    }

    logs.push("Auto-login successful");
    return logAndRespond(200, "Auto-login successful", logs, { user });
  } catch (error) {
    logs.push("Unauthorized");
    return logAndRespond(401, "Unauthorized", logs);
  }
};
