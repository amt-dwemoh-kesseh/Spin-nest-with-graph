import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { GraphQLError } from 'graphql';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService) {}

  verifyToken(req: Request) {
    try {
      const receivedValue = req.headers['authorization'];

      if (!receivedValue || receivedValue === undefined) {
        throw new GraphQLError('Invalid token');
      }

      if (receivedValue.startsWith('Bearer ')) {
        const token = receivedValue.split(' ')[1];
        const decoded = jwt.verify(token, this.config.get('JWT_SECRET'));
        return decoded;
      } else {
        throw new GraphQLError('Authorization header is malformed');
      }
    } catch (error) {
      throw new GraphQLError(error.message || 'Invalid token');
    }
  }

  genToken(user: User): string {
    interface PayloadInterface {
      sub: number;
      email: string;
    }

    const payload: PayloadInterface = {
      sub: user.id,
      email: user.email,
    };

    const secret = this.config.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    try {
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      return 'Bearer ' + token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
