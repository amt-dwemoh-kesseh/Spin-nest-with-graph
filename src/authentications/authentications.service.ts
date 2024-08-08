import { Injectable } from '@nestjs/common';
import { AuthenticationInput } from './dto/authentication.input';
import { DbConnectService } from 'src/db-connect/db-connect.service';
import * as argon from 'argon2';
import { GraphQLError } from 'graphql';
import { AuthService } from 'src/utils/jwt.auth';

@Injectable()
export class AuthenticationsService {
  constructor(
    private prisma: DbConnectService,
    private AuthService: AuthService,
  ) {}

  async genUserToken(AuthenticationInput: AuthenticationInput) {
    const { email, password } = AuthenticationInput;
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      const passwordmatches = argon.verify(user.hash, password);
      if (!passwordmatches) throw new GraphQLError('Password does not match');

      const token = await this.AuthService.genToken(user);

      return { generateToken: token };
    } catch (error) {
      return error;
    }
  }
}
