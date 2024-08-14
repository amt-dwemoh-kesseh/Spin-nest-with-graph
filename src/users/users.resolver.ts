import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserSuccess, User, PostSuccess, Post } from './entities/user.entity';
import { UserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PostInput } from './dto/post.input';
import { PostService } from './post.service';
import {} from '@nestjs/graphql'
import { Request } from 'express';

@Resolver(() => UserSuccess)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postService: PostService,
  ) {}

  @Mutation(() => UserSuccess)
  createUser(@Args('createUserInput') UserInput: UserInput) {
    return this.usersService.create(UserInput);
  }

  @Query(() => [UserSuccess], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('UserInput') userInput: UserInput) {
    return this.usersService.findOne(userInput);
  }

  @Mutation(() => UserSuccess)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserSuccess)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => PostSuccess)
  createPost(@Args('PostInput') postInput: PostInput) {
    return this.postService.createUserPost(postInput);
  }

  @Query(() => [Post], { name: 'userPosts' })
  findAllPosts(
    @Args('PostInput') postInput: PostInput,
    @Context('req') req: Request
  ) {
    return this.postService.findAllUserPosts(req,postInput);
  }

  @Query(() => Post, { name: 'userPost' })
  findUserPost(@Args('PostInput') postInput: PostInput) {
    return this.postService.findUserPost(postInput);
  }
}
