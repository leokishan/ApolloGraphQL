import { GraphQLScalarType, Kind } from 'graphql';
import { format, parse } from "date-fns";
import { validateFieldValue } from './validateFields';
import { throwError } from './throwError';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return format(value, 'MM/dd/yyyy');
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'string') {
      validateFieldValue(value, "date")
      const date = parse(value, 'MM/dd/yyyy', new Date());
      if(isNaN(date.getTime())) throwError("Please enter valid date", 400)
      return date;
    }
    throw new Error('GraphQL Date Scalar parser expected a `string`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export default dateScalar