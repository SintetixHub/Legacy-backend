import { hash, compare } from "bcrypt";

const hashPassword = async (password) => {
  return await hash(password, 10);
};

const comparePasswords = async (receivedPassword, hashedPassword) => {
  return await compare(receivedPassword, hashedPassword);
};

export { hashPassword, comparePasswords };
