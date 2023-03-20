import prisma from "../config/prismaClient";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/authUtility";
import { throwError } from "../utils/throwError";
import { validateFieldValue } from "../utils/validateFields";
import {
  LoginResponse,
  MutationChangePasswordArgs,
  MutationSignupArgs,
  Resolver,
  QueryLoginArgs,
  User,
} from "../__generated__/graph-types";

const login: Resolver<LoginResponse> = async (
  _: any,
  { credentials }: QueryLoginArgs
) => {
  // Validate field value formats
  validateFieldValue(credentials.email, "email")
  validateFieldValue(credentials.password, "password")

  // Check if user with same email id exists or not
  const existingUser = await prisma.user.findUnique({
    where: { email: credentials.email },
  }).catch(err => {
    console.error(err);
    throwError("Something went wrong, please try again later.", 500)
  });
  if (!existingUser) {
    throwError("No account found with this email ID.", 400)
    return
  }

  // Check if entered password matches or not
  const validPassword = await comparePassword(
    credentials.password,
    existingUser.password
  );
  if (!validPassword) throwError("Invalid password, please try again.", 400)

  // Generate JWT token and return it in response
  const token = generateToken({ id: existingUser.id });
  return {
    id: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
    token,
  };
};

const signup: Resolver<User> = async (_, { user }: MutationSignupArgs) => {
  // Validate field value formats
  validateFieldValue(user.email, "email")
  validateFieldValue(user.password, "password")

  // Throw error if user with same email id already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  }).catch(err => {
    console.error(err);
    throwError("Something went wrong, please try again later.", 500)
  });
  if (existingUser) throwError("Account with same email ID already exists.", 400)

  // Hash user password and persist in data storage
  const hashedPassword = await hashPassword(user.password);
  return prisma.user
    .create({
      data: {
        email: user.email,
        username: user.username,
        password: hashedPassword,
      },
    })
    .then((createdUser) => {
      return {
        email: createdUser.email,
        username: createdUser.username,
      };
    }).catch(err => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500)
      return null;
    });;
};

const changePassword: Resolver<User> = async (
  _,
  { credentials }: MutationChangePasswordArgs
) => {
  // Validate field value format
  validateFieldValue(credentials.email, "email")
  validateFieldValue(credentials.newPassword, "password")
  validateFieldValue(credentials.password, "password")

  // throw error if user with email id does not exist
  const existingUser = await prisma.user.findUnique({
    where: { email: credentials.email },
  }).catch(err => {
    console.error(err);
    throwError("Something went wrong, please try again later.", 500)
  });;
  if (!existingUser) {
    throwError("No account found with this email ID.", 400)
    return
  }

  // Throw error if existing password is invalid
  const validPassword = await comparePassword(
    credentials.password,
    existingUser.password
  );
  if (!validPassword) throwError("Invalid current password, please try again.", 400)

  // Hash new password and persist in data storage
  const hashedNewPassoword = await hashPassword(credentials.newPassword);
  return prisma.user
    .update({
      where: { email: credentials.email },
      data: { password: hashedNewPassoword },
    })
    .then((updatedUser) => {
      return {
        email: updatedUser.email,
        username: updatedUser.username,
      };
    }).catch(err => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500)
      return null;
    });
};

export const AuthenticationResolver = {
  query: { login },
  mutation: { signup, changePassword },
};
