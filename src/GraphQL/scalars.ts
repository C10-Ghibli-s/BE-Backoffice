
import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Represents a date time object',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize(value: any) {
    return value.toISOString(); // Convert outgoing Date to ISOString for JSON
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});
