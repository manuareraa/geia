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
  projectName: Joi.string().required(),
  country: Joi.string().required(),
  address: Joi.string().required(),
  gpsCoordinates: Joi.string().required(),
  ownership: Joi.string()
    .valid("individual", "proprietary", "community")
    .required(),
  areaSize: Joi.string().required(),
}).options({ abortEarly: false });

const nameStatusSchema = Joi.object({
  projectId: Joi.string().uuid().required(),
  projectName: Joi.string(),
  projectStatus: Joi.string().valid("active", "inactive"),
}).options({ abortEarly: false });

const metadataSchema = Joi.object({
  projectId: Joi.string().uuid().required(),
  country: Joi.string(),
  address: Joi.string(),
  gpsCoordinates: Joi.string(),
  ownership: Joi.string().valid("individual", "proprietary", "community"),
  areaSize: Joi.string(),
  projectProgress: Joi.number(),
  interventionType: Joi.string(),
  description: Joi.string(),
}).options({ abortEarly: false });

const metaImagesSchema = Joi.object({
  projectId: Joi.string().uuid().required(),
  logo: Joi.string().uri().empty(""),
  cover: Joi.string().uri().empty(""),
  baseline: Joi.string().uri().empty(""),
  nft: Joi.string().uri().empty(""),
}).options({ abortEarly: false });

const sectionSchema = Joi.string()
  .valid(
    "imageGallery",
    "substackArticles",
    "sponsors",
    "metaImages",
    "mainData.links",
    "mainData.docs",
    "mainData.environment",
    "mainData.landCondition",
    "mainData.seasons",
    "mainData.monitors"
  )
  .required();

const arraysSchema = Joi.object({
  projectId: Joi.string().uuid().required(),
  substackArticles: Joi.array().items(Joi.string().uri()),
  imageGallery: Joi.array().items(Joi.string().uri()),
  sponsors: Joi.array().items(
    Joi.object({
      sponsorId: Joi.string().uuid().required(),
      sponsorName: Joi.string().empty(""),
      tokensSponsored: Joi.number().required(),
      tokensClaimed: Joi.number().required(),
      linkToSite: Joi.string().uri().empty(""),
      logoUrl: Joi.string().uri().empty(""),
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
  projectId: Joi.string().uuid().required(),
  tokenId: Joi.number(),
  buyPrice: Joi.number(),
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

  if (
    event.path !== "/admin/content/update/sponsor/claimed-token" &&
    event.httpMethod !== "POST"
  ) {
    try {
      verifyToken(event);
    } catch (error) {
      logs.push("Unauthorized");
      console.log(logs.join("\n"));
      return logAndRespond(401, "Unauthorized", logs);
    }
  }

  switch (true) {
    case event.path === "/admin/content/create" && event.httpMethod === "POST":
      return await handleCreateProject(event, logs);
    case event.path === "/admin/content/edit-namestat" &&
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
    case event.path === "/admin/content/projects" && event.httpMethod === "GET":
      return await handleGetAllProjects(event, logs);
    case event.path === "/admin/content/project-summary" &&
      event.httpMethod === "GET":
      return await handleGetProjectFields(event, logs);
    case event.path === "/admin/content/project" && event.httpMethod === "GET":
      return await handleGetProjectById(event, logs);
    case event.path === "/admin/content/delete-project" &&
      event.httpMethod === "DELETE":
      return await handleDeleteProject(event, logs);
    case event.path === "/admin/content/redeem" && event.httpMethod === "POST":
      return await handleIncrementClaimed(event, logs);
    case event.path === "/admin/content/update-claimed-token" &&
      event.httpMethod === "POST":
      return await handleIncrementClaimedByTokenId(event, logs);
    case event.path === "/admin/content/update/sponsor/claimed-token" &&
      event.httpMethod === "POST":
      return await handleUpdateSponsorClaimedToken(event, logs);
    case event.path === "/admin/content/wallet-summary" &&
      event.httpMethod === "POST":
      return await handleWalletSummary(event, logs);
    default:
      logs.push("Invalid path or method");
      return logAndRespond(400, "Invalid path or method", logs);
  }
};

const handleWalletSummary = async (event, logs) => {
  // Get an array of token IDs and find the project name and project ID that have those token IDs
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { tokenIds, tokenBalances } = requestBody;

  // Iterate over the tokenIds and query the DynamoDB table
  const allProjects = [];
  let index = 0;

  for (const tokenId of tokenIds) {
    const dbParams = {
      TableName: DYNAMODB_TABLE,
      FilterExpression: "tokenData.tokenId = :tokenId",
      ExpressionAttributeValues: {
        ":tokenId": tokenId,
      },
      ProjectionExpression: "projectId, projectName, metaImages.nft", // Only retrieve projectId and projectName
    };

    try {
      const dbResponse = await dynamoDB.scan(dbParams).promise();
      logs.push(`Fetched projects for tokenId: ${tokenId}`);
      allProjects.push(
        ...dbResponse.Items.map((item) => ({
          projectId: item.projectId,
          projectName: item.projectName,
          tokenBalance: tokenBalances[index],
          tokenId: tokenId,
          nft: item.metaImages.nft,
        }))
      );
      index++;
    } catch (error) {
      logs.push(
        `Error fetching projects for tokenId: ${tokenId} - ${error.message}`
      );
      return logAndRespond(500, "Error fetching projects", logs);
    }
  }

  logs.push("Fetched all projects for the provided token IDs");
  return logAndRespond(200, "Fetched all projects successfully", logs, {
    summary: allProjects,
  });
};

const handleUpdateSponsorClaimedToken = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  console.log("Request Body: ", requestBody);
  console.log("SponsorId: ", requestBody.sponsorId);
  console.log("TokenId: ", requestBody.tokenId);

  // const { sponsorId, tokenId } = requestBody;
  const { sponsorId, tokenId, qty } = requestBody;

  console.log("SponsorId: ", sponsorId);
  console.log("TokenId: ", tokenId);

  // Regular expression to validate UUID (version 4)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // Check if sponsorId is a valid UUID and tokenId is a non-negative integer
  if (
    !uuidRegex.test(sponsorId) ||
    !(Number.isInteger(tokenId) && tokenId >= 0)
  ) {
    logs.push("Invalid sponsorId or tokenId in the request body");
    return logAndRespond(400, "Invalid sponsorId or tokenId", logs);
  }

  // const dbParams = {
  //   TableName: DYNAMODB_TABLE,
  //   FilterExpression: "contains(tokenData.tokenId, :tokenId)",
  //   ExpressionAttributeValues: {
  //     ":tokenId": tokenId,
  //   },
  // };

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    FilterExpression: "tokenData.tokenId = :tokenId",
    ExpressionAttributeValues: {
      ":tokenId": tokenId,
    },
  };

  try {
    const dbResponse = await dynamoDB.scan(dbParams).promise();
    if (dbResponse.Items.length === 0) {
      logs.push(`TokenId: ${tokenId} not found in any project`);
      return logAndRespond(404, "TokenId not found", logs);
    }

    const project = dbResponse.Items[0];
    const projectId = project.projectId;

    let sponsorIndex = -1;
    project.sponsors.forEach((sponsor, index) => {
      if (sponsor.sponsorId === sponsorId) {
        sponsorIndex = index;
      }
    });

    if (sponsorIndex === -1) {
      logs.push(
        `SponsorId: ${sponsorId} not found in project with tokenId: ${tokenId}`
      );
      return logAndRespond(404, "SponsorId not found", logs);
    }

    const updateParams = {
      TableName: DYNAMODB_TABLE,
      Key: { projectId },
      UpdateExpression: `SET sponsors[${sponsorIndex}].tokensClaimed = sponsors[${sponsorIndex}].tokensClaimed + :inc`,
      ExpressionAttributeValues: {
        ":inc": parseInt(qty) || 1,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const updateResponse = await dynamoDB.update(updateParams).promise();
    logs.push(
      `Incremented tokensClaimed for sponsorId: ${sponsorId} in project with projectId: ${projectId}`
    );
    return logAndRespond(200, "Incremented tokensClaimed successfully", logs, {
      sponsor: updateResponse.Attributes.sponsors[sponsorIndex],
    });
  } catch (error) {
    logs.push(`Error incrementing tokensClaimed: ${error.message}`);
    return logAndRespond(500, "Error incrementing tokensClaimed", logs);
  }
};

const handleIncrementClaimedByTokenId = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = tokenDataSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { tokenId, tokenQty } = requestBody;

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    FilterExpression: "tokenData.tokenId = :tokenId",
    ExpressionAttributeValues: {
      ":tokenId": tokenId,
    },
  };

  try {
    const dbResponse = await dynamoDB.scan(dbParams).promise();
    if (dbResponse.Items.length === 0) {
      logs.push(`TokenId: ${tokenId} not found`);
      return logAndRespond(404, "TokenId not found", logs);
    }

    const projectId = dbResponse.Items[0].projectId;
    const dbParamsUpdate = {
      TableName: DYNAMODB_TABLE,
      Key: { projectId },
      UpdateExpression:
        "SET tokenData.claimed = if_not_exists(tokenData.claimed, :start) + :inc",
      ExpressionAttributeValues: {
        ":inc": parseInt(tokenQty),
        ":start": 0,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const dbResponseUpdate = await dynamoDB.update(dbParamsUpdate).promise();
    logs.push(
      `Incremented tokenData.claimed for project with projectId: ${projectId}`
    );
    return logAndRespond(
      200,
      "Incremented tokenData.claimed successfully",
      logs,
      {
        tokenData: dbResponseUpdate.Attributes.tokenData,
      }
    );
  } catch (error) {
    logs.push(`Error incrementing tokenData.claimed: ${error.message}`);
    return logAndRespond(500, "Error incrementing tokenData.claimed", logs);
  }
};

const handleIncrementClaimed = async (event, logs) => {
  const queryStringParameters = event.queryStringParameters || {};
  const { projectId } = queryStringParameters;

  if (!projectId) {
    logs.push("Missing projectId query parameter");
    return logAndRespond(400, "Missing projectId query parameter", logs);
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { projectId },
    UpdateExpression:
      "SET tokenData.claimed = if_not_exists(tokenData.claimed, :start) + :inc",
    ExpressionAttributeValues: {
      ":inc": 1,
      ":start": 0,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(
      `Incremented tokenData.claimed for project with projectId: ${projectId}`
    );
    return logAndRespond(
      200,
      "Incremented tokenData.claimed successfully",
      logs,
      {
        tokenData: dbResponse.Attributes.tokenData,
      }
    );
  } catch (error) {
    logs.push(`Error incrementing tokenData.claimed: ${error.message}`);
    return logAndRespond(500, "Error incrementing tokenData.claimed", logs);
  }
};

const handleGetAllProjects = async (event, logs) => {
  const dbParams = {
    TableName: DYNAMODB_TABLE,
  };

  try {
    const dbResponse = await dynamoDB.scan(dbParams).promise();
    logs.push("Fetched all projects");
    return logAndRespond(200, "Fetched all projects successfully", logs, {
      projects: dbResponse.Items,
    });
  } catch (error) {
    logs.push(`Error fetching projects: ${error.message}`);
    return logAndRespond(500, "Error fetching projects", logs);
  }
};

const handleDeleteProject = async (event, logs) => {
  const queryStringParameters = event.queryStringParameters || {};
  const { projectId } = queryStringParameters;

  if (!projectId) {
    logs.push("Missing projectId query parameter");
    return logAndRespond(400, "Missing projectId query parameter", logs);
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { projectId },
  };

  try {
    const dbResponse = await dynamoDB.delete(dbParams).promise();
    logs.push(`Deleted project with projectId: ${projectId}`);
    return logAndRespond(200, "Project deleted successfully", logs);
  } catch (error) {
    logs.push(`Error deleting project: ${error.message}`);
    return logAndRespond(500, "Error deleting project", logs);
  }
};

const handleGetProjectFields = async (event, logs) => {
  const dbParams = {
    TableName: DYNAMODB_TABLE,
    ProjectionExpression:
      "projectId, projectName, createdAt, metadata.country, metadata.address, projectStatus, metaImages.logo",
  };

  try {
    const dbResponse = await dynamoDB.scan(dbParams).promise();
    logs.push("Fetched project fields");
    return logAndRespond(200, "Fetched project fields successfully", logs, {
      projects: dbResponse.Items,
    });
  } catch (error) {
    logs.push(`Error fetching project fields: ${error.message}`);
    return logAndRespond(500, "Error fetching project fields", logs);
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
    TableName: DYNAMODB_TABLE,
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

  const { projectName, country, address, gpsCoordinates, ownership, areaSize } =
    requestBody;
  const projectId = uuidv4();

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Item: {
      projectId: projectId,
      projectName,
      projectStatus: "inactive",
      createdAt: new Date().toISOString(),
      metadata: {
        country,
        address,
        gpsCoordinates,
        ownership,
        areaSize,
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
        reserved: 0,
        claimed: 0,
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
    logs.push(`Project created with projectId: ${projectId}`);
    return logAndRespond(201, "Project created successfully", logs, {
      projectId: projectId,
    });
  } catch (error) {
    logs.push(`Error creating project: ${error.message}`);
    return logAndRespond(500, "Error creating project", logs);
  }
};

// Handle editing projectName and projectStatus
const handleEditNameStatus = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  const { error } = nameStatusSchema.validate(requestBody);
  if (error) {
    const details = error.details.map((detail) => detail.message);
    logs.push(`Validation error: ${details.join(", ")}`);
    return logAndRespond(400, `Validation failed: ${details.join(", ")}`, logs);
  }

  const { projectId, projectName, projectStatus } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  if (projectName) {
    updateExpressions.push("projectName = :projectName");
    expressionAttributeValues[":projectName"] = projectName;
  }

  if (projectStatus) {
    updateExpressions.push("projectStatus = :projectStatus");
    expressionAttributeValues[":projectStatus"] = projectStatus;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { projectId },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`Project updated with projectId: ${projectId}`);
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

  const { projectId, ...metadata } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(metadata)) {
    updateExpressions.push(`metadata.${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { projectId },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`Metadata updated for project with projectId: ${projectId}`);
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

  const { projectId, ...metaImages } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(metaImages)) {
    updateExpressions.push(`metaImages.${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { projectId },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`MetaImages updated for project with projectId: ${projectId}`);
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
// const handleEditArrays = async (event, logs) => {
//   const requestBody = JSON.parse(event.body);
//   logs.push(`Request body: ${JSON.stringify(requestBody)}`);

//   // Validate the section
//   const { error: sectionError } = sectionSchema.validate(requestBody.section);
//   if (sectionError) {
//     const details = sectionError.details
//       .map((detail) => detail.message)
//       .join(", ");
//     logs.push(`Section validation error: ${details}`);
//     return logAndRespond(400, `Section validation failed: ${details}`, logs);
//   }

//   // Validate the arrays data
//   const { error: arraysError } = arraysSchema.validate(requestBody);
//   if (arraysError) {
//     const details = arraysError.details
//       .map((detail) => detail.message)
//       .join(", ");
//     logs.push(`Validation error: ${details}`);
//     return logAndRespond(400, `Validation failed: ${details}`, logs);
//   }

//   const { projectId, section, ...sectionData } = requestBody;

//   const updateExpression = `SET ${section} = :sectionData`;
//   const expressionAttributeValues = {
//     ":sectionData": sectionData[section],
//   };

//   const dbParams = {
//     TableName: DYNAMODB_TABLE,
//     Key: { projectId },
//     UpdateExpression: updateExpression,
//     ExpressionAttributeValues: expressionAttributeValues,
//     ReturnValues: "ALL_NEW",
//   };

//   try {
//     const dbResponse = await dynamoDB.update(dbParams).promise();
//     logs.push(
//       `Section ${section} updated for project with projectId: ${projectId}`
//     );
//     return logAndRespond(
//       200,
//       `Section ${section} updated successfully`,
//       logs,
//       dbResponse.Attributes
//     );
//   } catch (error) {
//     logs.push(`Error updating section ${section}: ${error.message}`);
//     return logAndRespond(500, `Error updating section ${section}`, logs);
//   }
// };
const handleEditArrays = async (event, logs) => {
  const requestBody = JSON.parse(event.body);
  logs.push(`Request body: ${JSON.stringify(requestBody)}`);

  // Validate the section
  const { error: sectionError } = sectionSchema.validate(requestBody.section);
  if (sectionError) {
    const details = sectionError.details
      .map((detail) => detail.message)
      .join(", ");
    logs.push(`Section validation error: ${details}`);
    return logAndRespond(400, `Section validation failed: ${details}`, logs);
  }

  // Validate the arrays data
  const { error: arraysError } = arraysSchema.validate(requestBody);
  if (arraysError) {
    const details = arraysError.details
      .map((detail) => detail.message)
      .join(", ");
    logs.push(`Validation error: ${details}`);
    return logAndRespond(400, `Validation failed: ${details}`, logs);
  }

  const { projectId, section, ...sectionData } = requestBody;

  // Handle nested sections
  let sectionPath = section.split(".");
  let dataToUpdate = sectionData;
  sectionPath.forEach((path) => {
    if (dataToUpdate[path]) {
      dataToUpdate = dataToUpdate[path];
    }
  });

  const updateExpression = `SET ${section} = :sectionData`;
  const expressionAttributeValues = {
    ":sectionData": dataToUpdate,
  };

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { projectId },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(
      `Section ${section} updated for project with projectId: ${projectId}`
    );
    return logAndRespond(
      200,
      `Section ${section} updated successfully`,
      logs,
      dbResponse.Attributes
    );
  } catch (error) {
    logs.push(`Error updating section ${section}: ${error.message}`);
    return logAndRespond(500, `Error updating section ${section}`, logs);
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

  const { projectId, tokenId, buyPrice } = requestBody;

  const updateExpressions = [];
  const expressionAttributeValues = {};

  if (tokenId !== undefined) {
    updateExpressions.push("tokenData.tokenId = :tokenId");
    expressionAttributeValues[":tokenId"] = tokenId;
  }

  if (buyPrice !== undefined) {
    updateExpressions.push("tokenData.buyPrice = :buyPrice");
    expressionAttributeValues[":buyPrice"] = buyPrice;
  }

  const dbParams = {
    TableName: DYNAMODB_TABLE,
    Key: { projectId },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const dbResponse = await dynamoDB.update(dbParams).promise();
    logs.push(`TokenData updated for project with projectId: ${projectId}`);
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
