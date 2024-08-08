import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserSuccess, User } from './entities/user.entity';
import { UserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserSuccess)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
}
