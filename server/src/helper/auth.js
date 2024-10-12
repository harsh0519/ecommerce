import { differenceInSeconds } from "date-fns";
import jwt from "jsonwebtoken";

// Create login token
const createLoginToken = async (payload) => {
  let loginToken = jwt.sign(payload, process.env.JWT_SECRETKEY_LOGIN, {
    expiresIn: "2d",
  });
  return loginToken;
};

// Decode login token
const decodeLoginToken = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(
      token,
      process.env.JWT_SECRETKEY_LOGIN,
      null,
      (err, decodedToken) => {
        if (err) {
          rej(err);
        }
        res(decodedToken);
      }
    ); // Verify instead of decode
  });
};

// Create forgot password token
const createForgotPassToken = async (payload) => {
  let token = await jwt.sign(payload, process.env.JWT_SECRETKEY_FP, {
    expiresIn: process.env.JWT_EXPIRY_FP,
  });
  return token;
};

// ---------------------------------------------------------------------------------------------------------------

// Middlewares

// Session expiry (authenticate)
const authenticate = async (req, res, next) => {
  let token = req?.headers?.authorization?.split(" ")[1];
  if (token) {
    try {
      let payload = await decodeLoginToken(token);
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Session expired",
        });
      } else {
        return res.status(401).send({
          message: "Invalid token",
        });
      }
    }
  } else {
    res.status(402).send({
      message: "Session is no longer available",
    });
  }
};

// Get user email from token
const getUserEmail = async (req, res, next) => {
  let token = req?.headers?.authorization?.split(" ")[1];
  if (token) {
    try {
      let payload = await decodeLoginToken(token);
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Session expired",
        });
      } else {
        return res.status(401).send({
          message: "Invalid token",
        });
      }
    }
  } else {
    res.status(500).send({
      message: "Token not provided",
    });
  }
};

// Role-based authorization for admin
const adminGuard = async (req, res, next) => {
  const headers = req?.headers;
  const authorization = headers.authorization;
  const isBearer = authorization.includes("Bearer");
  const token = isBearer ? authorization.split(" ")?.[1] : authorization;
  if (token) {
    try {
      let payload = await decodeLoginToken(token);
      next();
    } catch (err) {
      console.error(err)
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Session expired",
        });
      } else {
        return res.status(401).send({
          message: "Invalid token",
        });
      }
    }
  } else {
    res.status(401).send({
      message: "Unauthorized access",
    });
  }
};

// Admin session authentication
const adminAuthenticate = async (req, res, next) => {
  const headers = req?.headers;
  const authorization = headers.authorization;
  const isBearer = authorization.includes("Bearer");
  const token = isBearer ? authorization.split(" ")?.[1] : authorization;
  if (token) {
    try {
      let payload = await decodeLoginToken(token);
      next();
    } catch (err) {
      console.error(err)
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Session expired",
        });
      } else {
        return res.status(401).send({
          message: "Invalid token",
        });
      }
    }
  } else {
    res.status(402).send({
      message: "Admin session is no longer available",
    });
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
