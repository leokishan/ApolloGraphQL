import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { throwError } from "./throwError";

/**
 * Check if user is authenticated or not where @protected directive is provided.
 */
export const authDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName) => {
      const authDirective = getDirective(schema, fieldConfig, "protected")?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = function (source, args, context, info) {
          if (!context.user) {
            throwError("Please login to perform this operation.", 401)
          }
          return resolve(source, args, context, info);
        };
        return fieldConfig;
      }
    },
  });
