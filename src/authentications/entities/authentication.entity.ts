import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Authentication {
  @Field(() => String, { description: 'User token' })
  generateToken: string;
}
