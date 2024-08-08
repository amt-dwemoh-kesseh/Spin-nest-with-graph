import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'ID of the post' })
  id: number;

  @Field(() => Int, { nullable: true, description: 'ID of the user who created the post' })
  user_id?: number;

  @Field(() => User, { nullable: true, description: 'User who created the post' })
  user?: User;

  @Field(() => String, { nullable: true, description: 'Content of the post' })
  note?: string;
}