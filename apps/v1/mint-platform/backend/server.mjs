import express from "express";
import bodyParser from "body-parser";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import chalk from "chalk";

// const uri = "mongodb://127.0.0.1:27017/";
const uri =
  "mongodb+srv://manuareraa:CrVup2sAlApFLZW3@cluster0.w3ygzkx.mongodb.net/";
const database = "geoblocs-mint-platform";
const app = express();
const port = process.env.PORT || 4005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const printInfo = (message) => {
  console.log(chalk.black.bgGreen.bold("[INFO]") + " " + message);
};

const printError = (message, error) => {
  console.log(chalk.black.bgRed.bold("[ERROR]") + " " + message);
  console.log(error);
};

const printFunctionCall = (functionName) => {
  console.log(
    chalk.black.bgYellow.bold(`[FUNCTION CALL]`) +
      " " +
      chalk.cyan.bgMagenta.bold(`[${functionName}]`)
  );
};

const printParameters = (parameters) => {
  console.log(chalk.magenta.bold("======================================"));
  console.log(chalk.magenta.bold("Parameters:"));
  console.log(parameters);
  console.log(chalk.magenta.bold("======================================"));
};

async function connectToMongoDB() {
  printInfo("Establishing connection to MongoDB Atlas...");
  try {
    await client.connect();
    printInfo("Connected to MongoDB Atlas");
  } catch (e) {
    printError("Error connecting to MongoDB Atlas", e);
  }
}

app.listen(port, async () => {
  await connectToMongoDB();
  printInfo(`Server listening on port ${port}`);
});

app.get("/", async (req, res) => {
  printFunctionCall("/");
  res.send("API/Backend is working!!");
});

app.post("/signup", async (req, res) => {
  printFunctionCall("/signup");
  printParameters(req.body);
  const { email, wallet } = req.body;
  const db = client.db(database);
  const collection = db.collection("users");
  const user = await collection.findOne({ email });
  if (user) {
    res.status(400).send({ message: "User already exists" });
  } else {
    let userObject = {
      email,
      wallet,
      mintHistory: [],
      timestamp: Date.now(),
    };
    const newUser = await collection.insertOne(userObject);
    res.status(200).send(newUser);
  }
});

app.get("/user-by-mail", async (req, res) => {
  printFunctionCall("/user-by-mail");
  printParameters(req.query);
  const { email } = req.query;
  const db = client.db(database);
  const collection = db.collection("users");
  const user = await collection.findOne({ email });
  if (user) {
    res.status(200).json({ status: "found", user });
  } else {
    res.status(200).json({ status: "not found", message: "User not found" });
  }
});

app.post("/add-mintHistory", async (req, res) => {
  printFunctionCall("/add-mintHistory");
  printParameters(req.body);
  const { email, mintHistory } = req.body;
  const db = client.db(database);
  const collection = db.collection("users");
  let user = await collection.findOne({ email });
  if (user) {
    user.mintHistory.push(mintHistory);
    //convert array to unique array
    user.mintHistory = [...new Set(user.mintHistory)];
    await collection.updateOne(
      { email },
      { $set: { mintHistory: user.mintHistory } }
    );
    res.status(200).send({ message: "Mint history added" });
  } else {
    res.status(400).send({ message: "User not found" });
  }
});
