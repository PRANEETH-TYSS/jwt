const req = require("express/lib/request");
const jwt = require("jsonwebtoken");
const AuthSchema = require("../models/Auth");

exports.Protected = () => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      res
        .status(401)
        .json({ message: "invalid token or you are not authorized" })
    );
  }
  try {
    let decoded = jwt.verify(token, "praneeth");
    req.user = await AuthSchema.findById(decoded.id);
    next();
  } catch (error) {
    return next(
      res
        .status(401)
        .json({ message: "invalid token or you are not authorized" })
    );
  }
};
