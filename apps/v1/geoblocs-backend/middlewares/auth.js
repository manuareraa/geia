const jwt = require("jsonwebtoken");
const { HTTP_UNAUTHORIZED } = require("http-status-codes");

const signAndSendToken = (user) => {
  const token = jwt.sign(
    { userUUID: user.uuid, userRole: user.role },
    process.env.JWT_SECRET
  );
  return token;
};

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(403).json({ message: "Authorization required" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res
      .status(HTTP_UNAUTHORIZED)
      .json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userUUID = decoded.userUUID;
    req.role = decoded.userRole;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(HTTP_UNAUTHORIZED)
        .json({ message: "Token has expired" });
    }
    return res.status(HTTP_UNAUTHORIZED).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate, signAndSendToken };
