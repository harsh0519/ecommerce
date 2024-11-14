import jwt from "jsonwebtoken";

// Create login token
const createLoginToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRETKEY_LOGIN, { expiresIn: "5d" });
};

// Decode and verify login token
const decodeLoginToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
};

// Create forgot password token
const createForgotPassToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRETKEY_FP, {
    expiresIn: process.env.JWT_EXPIRY_FP,
  });
};

// ---------------------------------------------------------------------------------------------------------------

// Helper Functions
const extractToken = (authorizationHeader) => {
  if (!authorizationHeader) return null;
  const isBearer = authorizationHeader.includes("Bearer");
  return isBearer ? authorizationHeader.split(" ")[1] : authorizationHeader;
};

const handleTokenError = (err, res) => {
  if (err.name === "TokenExpiredError") {
    return res.status(401).send({ message: "Session expired" });
  } else {
    return res.status(401).send({ message: "Invalid token" });
  }
};

// Middlewares

// Session expiry (authenticate)
const authenticate = async (req, res, next) => {
  const token = extractToken(req?.headers?.authorization);
  if (!token) {
    return res.status(402).send({ message: "Session is no longer available" });
  }
  try {
    req.user = await decodeLoginToken(token, process.env.JWT_SECRETKEY_LOGIN);
    next();
  } catch (err) {
    handleTokenError(err, res);
  }
};

// Get user email from token
const getUserEmail = async (req, res, next) => {
  const token = extractToken(req?.headers?.authorization);
  if (!token) {
    return res.status(500).send({ message: "Token not provided" });
  }
  try {
    req.user = await decodeLoginToken(token, process.env.JWT_SECRETKEY_LOGIN);
    next();
  } catch (err) {
    handleTokenError(err, res);
  }
};

// Role-based authorization for admin
const adminGuard = async (req, res, next) => {
  const token = extractToken(req?.headers?.authorization);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  try {
    req.user = await decodeLoginToken(token, process.env.JWT_SECRETKEY_LOGIN);
    next();
  } catch (err) {
    handleTokenError(err, res);
  }
};

// Admin session authentication
const adminAuthenticate = async (req, res, next) => {
  const token = extractToken(req?.headers?.authorization);
  if (!token) {
    return res.status(402).send({ message: "Admin session is no longer available" });
  }
  try {
    req.user = await decodeLoginToken(token, process.env.JWT_SECRETKEY_LOGIN);
    next();
  } catch (err) {
    handleTokenError(err, res);
  }
};

export default {
  createLoginToken,
  decodeLoginToken,
  createForgotPassToken,
  authenticate,
  getUserEmail,
  adminGuard,
  adminAuthenticate,
};
