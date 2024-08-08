import { GraphQLError, GraphQLFormattedError } from 'graphql';

export class ErrorFormatter {
  format(error: GraphQLError): GraphQLFormattedError {
    return {
      message: error.message,
      path: error.path,
    };
  }
}
