import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import jwt from "jsonwebtoken";

// Initialize AWS SDK clients
const s3Client = new S3Client({});

// Environment variables
const BucketName = "geoblocs-projects-data"; // Change this to your bucket name
const URL_EXPIRATION_TIME = 30; // URL expiration time in seconds
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
const JWT_SECRET = "mysecretkey"; // Set your secret key
const CloudFrontDomain = "https://d2itlus54uyuca.cloudfront.net";

// Helper function to log and return a response
const response = (statusCode, message, data = {}) => {
  const response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
    },
    body: JSON.stringify({
      message: message,
      data: data,
    }),
  };
  console.log(response);
  return response;
};

// Validation schema
const fileSchema = Joi.object({
  fileType: Joi.string().required(),
  contentType: Joi.string()
    .valid("image/png", "image/jpeg", "application/pdf")
    .required(),
  section: Joi.string().required(),
  id: Joi.string().uuid().required(),
}).options({ abortEarly: false, allowUnknown: false });

// Verify JWT token
const verifyToken = (event) => {
  const token = event.headers.Authorization;
  if (!token) {
    throw new Error("Unauthorized - No token provided");
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Unauthorized - Invalid token");
  }
};

export const handler = async (event) => {
  console.log("Event: ", event);

  try {
    verifyToken(event);
  } catch (error) {
    return response(401, error.message);
  }

  if (event.httpMethod === "POST" && event.path === "/admin/files/upload") {
    return await handleUpload(event);
  }

  if (event.httpMethod === "DELETE" && event.path === "/admin/files/delete") {
    return await handleDelete(event);
  }

  // simple health check
  if (event.httpMethod === "GET" && event.path === "/admin/files/health") {
    return response(200, "Health check passed");
  }

  return response(
    400,
    `Unrecognized method "${event.httpMethod + " " + event.path}"`
  );
};

const handleUpload = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    return response(400, "Bad Request - Invalid JSON");
  }

  const { error } = fileSchema.validate(payload);
  if (error) {
    const details = error.details.map((detail) => detail.message).join(", ");
    return response(400, `Validation failed: ${details}`);
  }

  const { fileType, contentType, section, id } = payload;
  const fileId = uuidv4();
  const finalPath = `${section}/${id}/${fileType}/${fileId}`;

  const putParams = {
    Bucket: BucketName,
    Key: finalPath,
    ContentType: contentType || "application/octet-stream",
  };

  try {
    const uploadUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand(putParams),
      { expiresIn: URL_EXPIRATION_TIME }
    );
    return response(201, "File upload URL generated successfully", {
      uploadUrl,
      fileUrl: `${CloudFrontDomain}/${finalPath}`,
    });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return response(500, "Internal Server Error");
  }
};

const handleDelete = async (event) => {
  const { fileUrl } = event.queryStringParameters;

  if (!fileUrl) {
    return response(400, "Bad Request - fileUrl is required");
  }

  const filePath = fileUrl.split(`${CloudFrontDomain}/`)[1];

  if (!filePath) {
    return response(400, "Bad Request - Invalid fileUrl");
  }

  const deleteParams = {
    Bucket: BucketName,
    Key: filePath,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    return response(200, "File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
    return response(500, "Internal Server Error");
  }
};
