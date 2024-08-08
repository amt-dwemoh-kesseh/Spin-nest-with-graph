import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  first_name: string;

  @Field(() => String, { nullable: true })
  last_name: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;
}
