import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from "@graphql-tools/mock";
import { ApplicationContext, schema } from "../..";

export const testServer = new ApolloServer<ApplicationContext>({
  schema: addMocksToSchema({
    schema,
    preserveResolvers: true,
  }),
});
