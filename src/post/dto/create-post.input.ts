import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreatePostInput {
  @Field(() => Int, { nullable: true })
  user_id: number;

  @Field(() => String, { nullable: true })
  note: string;

  @Field(() => User, { nullable: true })
  user: User
}
