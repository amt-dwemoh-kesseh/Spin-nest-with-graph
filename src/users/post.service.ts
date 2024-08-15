import { DbConnectService } from 'src/db-connect/db-connect.service';
import { PostInput } from './dto/post.input';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { AuthenticationsService } from 'src/authentications/authentications.service';
import { Request } from 'express';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: DbConnectService,
    private readonly auth: AuthenticationsService,
  ) {}
  async findAllUserPosts(req: Request, postInput: PostInput) {
    const { user_id } = postInput;

    try {
      const checkUser = await this.prisma.user.findFirst({
        where: { id: user_id },
      });

      if (!checkUser) {
        throw new GraphQLError('User not found');
      }

      // const isUser = await this.auth.verifyUserToken(req, checkUser);
      const userPosts = await this.prisma.posts.findMany({
        where: {
          user_id: user_id,
        },
        include: {
          user: true,
        },
      });
      return userPosts;
      // if (isUser) {
        
      // } else {
      //   throw new GraphQLError('User verification failed');
      // }
    } catch (error) {
      // Ensuring that the error is always a GraphQLError
      throw new GraphQLError(error.message || 'An error occurred while fetching posts');
    }
  }

  async findUserPost(postInput: PostInput) {
    const { user_id, id } = postInput;
    try {
      const checkUser = await this.prisma.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!checkUser) {
        throw new GraphQLError('User not found');
      }

      const post = await this.prisma.posts.findFirst({
        where: {
          id: id,
          user_id: checkUser.id,
        },
        include: {
          user: true,
        },
      });
      if (!post) {
        throw new GraphQLError('Post not found');
      }
      return post;
    } catch (error) {
      return error;
    }
  }

  async createUserPost(PostInput: PostInput) {
    const { user_id, note } = PostInput;
    try {
      const checkUser = await this.prisma.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!checkUser) {
        throw new GraphQLError('User not found');
      }

      const post = await this.prisma.posts.create({
        data: {
          user_id: checkUser.id,
          note: note,
        },
        include: {
          user: true,
        },
      });

      return {
        post,
        message: 'Post created successfully',
      };
    } catch (error) {
      return error;
    }
  }
}
