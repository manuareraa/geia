import express from "express";
import fetch from "node-fetch";
import { getChain } from "@alchemy/aa-core";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const apiKey = "jIxllEB917SPw8x-TnXNpSLqScKmVhko";
const apiUrl = "https://api.g.alchemy.com";
const hardcodedChainId = 80002;

// Alchemy Signer requests
app.post("/api/rpc/*", async (req, res) => {
  console.log("Making request");
  console.log("0", apiKey, apiUrl);

  if (!apiKey) {
    return res.status(500).json({ error: "ALCHEMY_API_KEY is not set" });
  }

  console.log("1", apiKey, apiUrl);

  const body = req.body;
  const routes = req.params[0].split("/").filter(Boolean).join("/");

  try {
    const response = await fetch(`${apiUrl}/${routes}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    console.log("response:", response);

    if (!response.ok) {
      return res
        .status(response.status)
        .json(await response.json().catch(() => ({})));
    }

    return res.json(await response.json());
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Chain RPC requests
app.post("/api/rpc/chain/:id", async (req, res) => {
  const chain = getChain(hardcodedChainId);
  if (!chain) {
    return res
      .status(404)
      .json({ error: `Chain not found: ${hardcodedChainId}` });
  }
  const rpcUrl = chain.rpcUrls.alchemy.http[0];

  if (!apiKey) {
    return res.status(500).json({ error: "ALCHEMY_API_KEY is not set" });
  }

  const body = req.body;

  try {
    const apiResponse = await fetch(`${rpcUrl}/${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorResult = await apiResponse
        .json()
        .catch(() => ({ message: "Failed to fetch data" }));
      return res.status(apiResponse.status).json(errorResult);
    }

    const result = await apiResponse.json();
    return res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
