import { Field, InputType } from '@nestjs/graphql';

@InputType() // 인자는 InputType을 사용해야함
export class CreateBoardInput {
  @Field(() => String) // 필드 정의
  writer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
