import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'ID of the user' })
  id: number;

  @Field(() => String, { nullable: true })
  first_name?: string;

  @Field(() => String, { nullable: true })
  last_name?: string;

  @Field(() => String)
  email: string;

  @Field(() => [Post], { nullable: 'itemsAndList' })
  posts?: Post[];
}

@ObjectType()
export class UserSuccess {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => User, { nullable: true })
  user: User;
}