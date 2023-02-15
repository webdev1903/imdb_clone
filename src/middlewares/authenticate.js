require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send("authorization token was not provided or was not valid");
  }

  if (!req.headers.authorization.startsWith("Bearer")) {
    return res
      .status(400)
      .send("authorization token was not provided or was not valid");
  }

  let token = req.headers.authorization.split(" ")[1];

  let result;

  try {
    result = await verifyToken(token);
  } catch (error) {
    return res.status(500).send(error.message);
  }

  req.user = result.user;
  // console.log(req.user);

  next();
};
