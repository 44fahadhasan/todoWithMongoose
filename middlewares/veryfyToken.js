const jwt = require("jsonwebtoken");

const veryfyToken = (req, res, next) => {
  try {
    const bearerToken = req.headers;
    const token = bearerToken?.authorization?.split(" ")[1];

    if (!token || token === "null") {
      return res.status(401).send({ message: "Token is null" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.decoded = decoded;
    next();
    //
  } catch (error) {
    next(error);
  }
};

module.exports = veryfyToken;
