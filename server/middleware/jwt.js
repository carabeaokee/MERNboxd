import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const { _id, email, username } = user;
  const payload = {
    sub: _id,
    email: email,
    username: username,
  };
  const options = {
    expiresIn: "90d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  console.log("token :>> ", token);

  return token;
};
