const jwt = require("jsonwebtoken");

// Secret key to sign and verify tokens
const secretKey = "your_secret_key";

// Function to generate a JWT for a user
function generateJWT(user) {
  const payload = {
    userId: user._id,
    role: user.role,
  };

  // Set the expiration time for the token (e.g., 1 hour)
  const expiresIn = "1h";

  // Sign the token with the secret key
  return jwt.sign(payload, secretKey, { expiresIn });
}

// Middleware to verify the JWT on each request
function verifyJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
}

module.exports = { generateJWT, verifyJWT };
