import { Injectable } from '@nestjs/common';
import { AuthenticationInput } from './dto/authentication.input';
import { DbConnectService } from 'src/db-connect/db-connect.service';
import * as argon from 'argon2';
import { GraphQLError } from 'graphql';
import { AuthService } from 'src/utils/jwt.auth';
import { Request } from 'express';

@Injectable()
export class AuthenticationsService {
  constructor(
    private prisma: DbConnectService,
    private AuthService: AuthService,
  ) {}

  async verifyUserToken(req: Request, user: { email: string; id: number }) {
    try {
      const decodedToken = this.AuthService.verifyToken(req);

      if (typeof decodedToken !== 'object' || decodedToken === null) {
        throw new GraphQLError('Invalid token structure');
      }

      const { sub, email } = decodedToken;

      if (parseInt(sub) !== user.id || email !== user.email) {
        throw new GraphQLError('Not Authorized');
      }

      return true;
    } catch (error) {
      throw new GraphQLError(error.message || 'User verification failed');
    }
  }

  async genUserToken(AuthenticationInput: AuthenticationInput) {
    const { email, password } = AuthenticationInput;
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) throw new GraphQLError('User not found');

      const passwordmatches = await argon.verify(user.hash, password);
      if (!passwordmatches) throw new GraphQLError('Password does not match');

      const token = await this.AuthService.genToken(user);

      return { generateToken: token };
    } catch (error) {
      throw new GraphQLError(error.message || 'Token generation failed');
    }
  }
}
