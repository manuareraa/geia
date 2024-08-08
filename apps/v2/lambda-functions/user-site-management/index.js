import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

// Initialize AWS SDK clients
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Environment variables
const DYNAMODB_PROJECT_TABLE = "admin-content";
const DYNAMODB_SUBSCRIBER_TABLE = "subscribers";

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

  switch (true) {
    case event.path === "/user/projects-summary" && event.httpMethod === "GET":
      return await handleGetAllProjectsSummary(event, logs);
    case event.path === "/user/project" && event.httpMethod === "GET":
      return await handleGetProjectById(event, logs);
    case event.path === "/user/subscribe" && event.httpMethod === "POST":
      return await handleSubscribe(event, logs);
    default:
      logs.push("Invalid path or method");
      return logAndRespond(400, "Invalid path or method", logs);
  }
};

const handleGetAllProjectsSummary = async (event, logs) => {
  const dbParams = {
    TableName: DYNAMODB_PROJECT_TABLE,
    ProjectionExpression:
      "projectId, projectName, metadata.country, metadata.address, projectStatus, metaImages.logo",
  };

  try {
    const dbResponse = await dynamoDB.scan(dbParams).promise();
    logs.push("Fetched all project summaries");
    return logAndRespond(
      200,
      "Fetched all project summaries successfully",
      logs,
      {
        projects: dbResponse.Items,
      }
    );
  } catch (error) {
    logs.push(`Error fetching project summaries: ${error.message}`);
    return logAndRespond(500, "Error fetching project summaries", logs);
  }
};

const handleGetProjectById = async (event, logs) => {
  const queryStringParameters = event.queryStringParameters || {};
  const { projectId } = queryStringParameters;

  if (!projectId) {
    logs.push("Missing projectId query parameter");
    return logAndRespond(400, "Missing projectId query parameter", logs);
  }

  const dbParams = {
    TableName: DYNAMODB_PROJECT_TABLE,
    Key: { projectId },
  };

  try {
    const dbResponse = await dynamoDB.get(dbParams).promise();
    if (dbResponse.Item) {
      logs.push(`Fetched project with projectId: ${projectId}`);
      return logAndRespond(200, "Fetched project successfully", logs, {
        project: dbResponse.Item,
      });
    } else {
      logs.push(`Project with projectId: ${projectId} not found`);
      return logAndRespond(404, "Project not found", logs);
    }
  } catch (error) {
    logs.push(`Error fetching project: ${error.message}`);
    return logAndRespond(500, "Error fetching project", logs);
  }
};

const handleSubscribe = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  if (!requestBody.email) {
    logs.push("Email is required");
    return logAndRespond(400, "Email is required", logs);
  }

  const subscriberId = uuidv4();
  const dbParams = {
    TableName: DYNAMODB_SUBSCRIBER_TABLE,
    Item: {
      subscriberId: subscriberId,
      email: requestBody.email,
      subscribedAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.put(dbParams).promise();
    logs.push(`Subscriber added with subscriberId: ${subscriberId}`);
    return logAndRespond(201, "Subscribed successfully", logs, {
      subscriberId: subscriberId,
    });
  } catch (error) {
    logs.push(`Error subscribing: ${error.message}`);
    return logAndRespond(500, "Error subscribing", logs);
  }
};
