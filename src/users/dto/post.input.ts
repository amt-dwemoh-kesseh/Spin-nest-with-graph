import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PostInput {
  @Field(() => Int, { description: 'ID of the post',nullable:true })
  id: number;

  @Field(() => Int, { nullable: true, description: 'ID of the user who created the post' })
  user_id?: number;

  @Field(() => String, { nullable: true, description: 'Content of the post' })
  note?: string;
}