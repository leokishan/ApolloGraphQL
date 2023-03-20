import { ApolloServer } from "@apollo/server";
import { unwrapResolverError } from "@apollo/server/errors";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { mutationResolver, queryResolver } from "./src/resolvers";
import { authDirectiveTransformer } from "./src/utils/protectedDirective";
import { contextExecutor } from "./src/utils/contextExecuter";
import dateScalar from "./src/utils/dateScalar";
import { Resolvers, UserResponse } from "./src/__generated__/graph-types";

const PORT = Number(process.env.PORT) || 4000;

// Create schema by combining definitions from all graphQL files.
const __dirname = dirname(fileURLToPath(import.meta.url));
const loadedSchema = loadFilesSync(path.join(__dirname, "./src/graph_schema"), {
  extensions: [".graphql"],
  recursive: true,
});
const mergedSchema = mergeTypeDefs(loadedSchema);

// Create resolver object with all resolvers and custom scalar type date.
const resolvers: Resolvers = {
  Date: dateScalar,
  Query: queryResolver,
  Mutation: mutationResolver,
};

const schema = makeExecutableSchema({
  typeDefs: mergedSchema,
  resolvers,
});

// Create interface for application context, if user is logged in then is details will be available to all resolvers.
export interface ApplicationContext {
  user?: UserResponse;
}

// Wrap schema with transformer to include implementation of custom graphQL directives(protected) and create apollo server
const server = new ApolloServer<ApplicationContext>({
  schema: authDirectiveTransformer(schema),
  formatError: (formattedError, error: any) => {
    const unwrappedError: any = unwrapResolverError(error)
      if (unwrappedError?.code === 'P2002') {
        return {
          ...formattedError,
          message: "Cannot create resource with same data.",
          extensions: {
            code: "BAD_REQUEST",
            http: { status: 400 }
          }
        }
      }
    return formattedError
  }
});

startStandaloneServer(server, {
  context: contextExecutor,
  listen: { port: PORT },
}).then(({ url }) => `Started on ${url}`);
