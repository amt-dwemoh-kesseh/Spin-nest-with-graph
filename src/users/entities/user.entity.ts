import { ObjectType, Field, Int } from '@nestjs/graphql';

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

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'ID of the post' })
  id: number;

  @Field(() => Int, {
    nullable: true,
    description: 'ID of the user who created the post',
  })
  user_id?: number;

  @Field(() => User, {
    nullable: true,
    description: 'User who created the post',
  })
  user?: User;

  @Field(() => String, { nullable: true, description: 'Content of the post' })
  note?: string;
}

@ObjectType()
export class PostSuccess {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Post, { nullable: true })
  post: Post;
}
