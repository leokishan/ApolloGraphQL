import { GraphQLError } from "graphql";

const statusCodes = {
  400: "BAD_REQUEST",
  403: "FORBIDDEN",
  401: "UNAUTHORIZED",
  500: "INTERNAL_SERVER_ERROR"
}

export const throwError = (message: string, code: keyof typeof statusCodes) => {
  throw new GraphQLError(message, {
    extensions: {
      code: statusCodes[code],
      http: { status: code },
    },
  });
}
