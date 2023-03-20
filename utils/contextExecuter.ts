import { ApplicationContext } from "..";
import prisma from "../config/prismaClient";
import { verifyToken } from "./authUtility";
import { throwError } from "./throwError";

export const contextExecutor = async ({ req }) => {
  const contextObject: ApplicationContext = {};
  const token = req.headers.authorization?.split(" ")?.[1] || "";

  // Verify if provided JWT token is valid or not
  if (token) {
    const tokenPayload = verifyToken(token);
    if (tokenPayload?.id) {
      const loggedInUser = await prisma.user.findUnique({
        where: { id: tokenPayload.id },
      });
      if (!loggedInUser) throwError("Invalid token.", 403)
      contextObject.user = loggedInUser;
    }
  }
  return contextObject;
};
