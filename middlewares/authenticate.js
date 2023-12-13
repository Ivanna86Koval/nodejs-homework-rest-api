import jwt from "jsonwebtoken";

import User from "../models/contacts/User.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === "") {
    throw HttpError(401, "Not authorized");
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!token) {
      throw HttpError(401, "user not found");
    }
    res.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

export default authenticate;
