import { Injectable } from '@nestjs/common';
import { UserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DbConnectService } from 'src/db-connect/db-connect.service';
import { GraphQLError } from 'graphql';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: DbConnectService) {}
  async create(createUserInput: UserInput) {
    const { first_name, last_name, email, password } = createUserInput;

    try {
      // Check if user with the given email already exists
      const checkUser = await this.prisma.user.findFirst({
        where: { email },
      });

      if (checkUser) {
        throw new GraphQLError('User already exists');
      }

      const hashedPassword = await argon.hash(password);
      // Create the new user
      const user = await this.prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          hash: hashedPassword,
        },
        select: {
          first_name: true,
          last_name: true,
          email: true,
        },
      });

      return {
        user,
        message: 'User created successfully',
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(data: UserInput) {
    const { email, password } = data;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new GraphQLError('User not found');
    }

    const passwordMatches = argon.verify(user.hash, password);
    if (!passwordMatches) {
      throw new GraphQLError('Password does not match');
    }

    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
