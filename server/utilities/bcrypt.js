import bcryptjs from "bcryptjs";

const hashPassword = async (password) => {
  const saltRounds = 10;

  const salt = await bcryptjs.genSalt(saltRounds);
  const hashedPassword = await bcryptjs.hash(password, salt);
  console.log("hashedPassword :>> ", hashedPassword);

  return hashedPassword;
};

const verifyPassword = (password, hashedPassword) => {
  const verified = bcryptjs.compare(password, hashedPassword);
  return verified;
};

export { hashPassword, verifyPassword };
