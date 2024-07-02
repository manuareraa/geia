import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import jwt from "jsonwebtoken";

// Initialize AWS SDK clients
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Environment variables
const DYNAMODB_TABLE = "admin-content";
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// Schema validation for different sections
const projectSchema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  address: Joi.string().required(),
  gpsCoordinates: Joi.string().required(),
  ownership: Joi.string()
    .valid("individual", "proprietary", "community")
    .required(),
  size: Joi.string().required(),
}).options({ abortEarly: false });

const nameStatusSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string(),
  status: Joi.string().valid("active", "inactive"),
}).options({ abortEarly: false });

const metadataSchema = Joi.object({
  id: Joi.string().uuid().required(),
  country: Joi.string(),
  address: Joi.string(),
  gpsCoordinates: Joi.string(),
  ownership: Joi.string().valid("individual", "proprietary", "community"),
  size: Joi.string(),
  projectProgress: Joi.number(),
  interventionType: Joi.string().valid("a", "b", "c"),
  description: Joi.string(),
}).options({ abortEarly: false });

const metaImagesSchema = Joi.object({
  id: Joi.string().uuid().required(),
  logo: Joi.string().uri(),
  cover: Joi.string().uri(),
  baseline: Joi.string().uri(),
  nft: Joi.string().uri(),
}).options({ abortEarly: false });

const arraysSchema = Joi.object({
  id: Joi.string().uuid().required(),
  substackArticles: Joi.array().items(Joi.string().uri()),
  imageGallery: Joi.array().items(Joi.string().uri()),
  sponsors: Joi.array().items(
    Joi.object({
      sponsorId: Joi.string().uuid().required(),
      sponsorName: Joi.string().required(),
      tokensSponsored: Joi.number().required(),
      linkToSite: Joi.string().uri(),
      logoUrl: Joi.string().uri(),
    })
  ),
  mainData: Joi.object({
    links: Joi.array().items(
      Joi.object({
        label: Joi.string().required(),
        link: Joi.string().uri().required(),
      })
    ),
    docs: Joi.array().items(
      Joi.object({
        label: Joi.string().required(),
        fileUrl: Joi.string().uri().required(),
      })
    ),
    environment: Joi.array().items(
      Joi.object({
        widgetLink: Joi.string().uri().required(),
        widgetId: Joi.string().uuid().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
      })
    ),
    landCondition: Joi.array().items(
      Joi.object({
        parameter: Joi.string().required(),
        condition: Joi.string().required(),
      })
    ),
    seasons: Joi.array().items(
      Joi.object({
        species: Joi.string().required(),
        month: Joi.string().required(),
        docUrl: Joi.string().uri().required(),
      })
    ),
    monitors: Joi.array().items(
      Joi.object({
        label: Joi.string().required(),
        link: Joi.string().uri().required(),
        imageUrl: Joi.string().uri().required(),
      })
    ),
  }).unknown(true),
})
  .unknown(true)
  .options({ abortEarly: false });

const tokenDataSchema = Joi.object({
  id: Joi.string().uuid().required(),
  tokenId: Joi.number(),
  buyPrice: Joi.number(),
  totalSupply: Joi.number(),
  available: Joi.number(),
  reserved: Joi.number(),
}).options({ abortEarly: false });

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

  try {
    verifyToken(event);
  } catch (error) {
    logs.push("Unauthorized");
    return logAndRespond(401, "Unauthorized", logs);
  }

  switch (true) {
    case event.path === "/admin/content/create" && event.httpMethod === "POST":
      return await handleCreateProject(event, logs);
    case event.path === "/admin/content/edit-name-status" &&
      event.httpMethod === "POST":
      return await handleEditNameStatus(event, logs);
    case event.path === "/admin/content/edit-metadata" &&
      event.httpMethod === "POST":
      return await handleEditMetadata(event, logs);
    case event.path === "/admin/content/edit-metaImages" &&
      event.httpMethod === "POST":
      return await handleEditMetaImages(event, logs);
    case event.path === "/admin/content/edit-arrays" &&
      event.httpMethod === "POST":
      return await handleEditArrays(event, logs);
    case event.path === "/admin/content/edit-tokenData" &&
      event.httpMethod === "POST":
      return await handleEditTokenData(event, logs);
    default:
      logs.push("Invalid path or method");
      return logAndRespond(400, "Invalid path or method", logs);
  }
};

// Handle project creation
const handleCreateProject = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = projectSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { name, country, address, gpsCoordinates, ownership, size } =
    requestBody;
  const projectId = uuidv4();

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Item: {
      id: projectId,
      name,
      status: "inactive",
      metadata: {
        country,
        address,
        gpsCoordinates,
        ownership,
        size,
        projectProgress: 0,
        interventionType: "",
        description: "",
      },
      metaImages: {
        logo: "",
        cover: "",
        baseline: "",
        nft: "",
      },
      substackArticles: [],
      imageGallery: [],
      tokenData: {
        tokenId: 0,
        buyPrice: 0.0,
        totalSupply: 0,
        available: 0,
        reserved: 0,
      },
      sponsors: [],
      mainData: {
        links: [],
        docs: [],
        environment: [],
        landCondition: [],
        seasons: [],
        monitors: [],
      },
    },
  };

  try {
    await dynamoDB.put(dbParams).promise();
    logs.push(`Project created with id: ${projectId}`);
    return logAndRespond(201, "Project created successfully", logs, {
      id: projectId,
    });
  } catch (error) {
    logs.push(`Error creating project: ${error.message}`);
    return logAndRespond(500, "Error creating project", logs);
  }
};

// Handle editing name and status
const handleEditNameStatus = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = nameStatusSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { id, name, status } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  if (name) {
    updateExpressions.push("name = :name");
    expressionAttributeValues[":name"] = name;
  }

  if (status) {
    updateExpressions.push("status = :status");
    expressionAttributeValues[":status"] = status;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`Project updated with id: ${id}`);
    return logAndRespond(
      200,
      "Project updated successfully",
      logs,
      dbResponse.Attributes
    );
  } catch (error) {
    logs.push(`Error updating project: ${error.message}`);
    return logAndRespond(500, "Error updating project", logs);
  }
};

// Handle editing metadata
const handleEditMetadata = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = metadataSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { id, ...metadata } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(metadata)) {
    updateExpressions.push(`metadata.${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`Metadata updated for project with id: ${id}`);
    return logAndRespond(
      200,
      "Metadata updated successfully",
      logs,
      dbResponse.Attributes
    );
  } catch (error) {
    logs.push(`Error updating metadata: ${error.message}`);
    return logAndRespond(500, "Error updating metadata", logs);
  }
};

// Handle editing metaImages
const handleEditMetaImages = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = metaImagesSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { id, ...metaImages } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(metaImages)) {
    updateExpressions.push(`metaImages.${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`MetaImages updated for project with id: ${id}`);
    return logAndRespond(
      200,
      "MetaImages updated successfully",
      logs,
      dbResponse.Attributes
    );
  } catch (error) {
    logs.push(`Error updating metaImages: ${error.message}`);
    return logAndRespond(500, "Error updating metaImages", logs);
  }
};

// Handle editing arrays (substackArticles, imageGallery, sponsors, mainData)
const handleEditArrays = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = arraysSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { id, ...arrays } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(arrays)) {
    updateExpressions.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`Arrays updated for project with id: ${id}`);
    return logAndRespond(
      200,
      "Arrays updated successfully",
      logs,
      dbResponse.Attributes
    );
  } catch (error) {
    logs.push(`Error updating arrays: ${error.message}`);
    return logAndRespond(500, "Error updating arrays", logs);
  }
};

// Handle editing tokenData
const handleEditTokenData = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = tokenDataSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { id, ...tokenData } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(tokenData)) {
    updateExpressions.push(`tokenData.${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`TokenData updated for project with id: ${id}`);
    return logAndRespond(
      200,
      "TokenData updated successfully",
      logs,
      dbResponse.Attributes
    );
  } catch (error) {
    logs.push(`Error updating tokenData: ${error.message}`);
    return logAndRespond(500, "Error updating tokenData", logs);
  }
};
