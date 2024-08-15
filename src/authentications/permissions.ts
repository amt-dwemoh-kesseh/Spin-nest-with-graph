import { rule, shield } from 'graphql-shield';
import { AuthService } from 'src/utils/jwt.auth';
import { GraphQLError } from 'graphql';

export class PermissionService {
  constructor(private authService: AuthService) {}

  public isAuthenticated = rule()(async (parent, args, ctx, info) => {
    try {
      const authUser = this.authService.verifyToken(ctx.req);
      if (authUser.sub === args.PostInput.user_id) {
        return true;
      }
      return false;
    } catch (error) {
      return new GraphQLError('Authentication failed: ' + error.message);
    }
  });

  public permissions = shield({
    Query: {
      userPosts: this.isAuthenticated,
    },
    //   Mutation: {
    //     '*': this.isAuthenticated,
    //   },
  });
}
