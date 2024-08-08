import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthenticationsService } from './authentications.service';
import { Authentication } from './entities/authentication.entity';
import { AuthenticationInput } from './dto/authentication.input';

@Resolver(() => Authentication)
export class AuthenticationsResolver {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Mutation(() => Authentication, { name: 'authentication' })
  async signIn(
    @Args('AuthenticationInput') AuthenticationInput: AuthenticationInput,
  ) {
    return await this.authenticationsService.genUserToken(AuthenticationInput);
  }
}
