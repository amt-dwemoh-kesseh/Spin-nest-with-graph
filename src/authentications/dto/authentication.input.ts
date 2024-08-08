import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthenticationInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}
