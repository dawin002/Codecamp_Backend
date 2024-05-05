import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { IContext } from '../../commons/interfaces/context';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String) // @Query 는 @nestjs/common 아니고 @nestjs/graphql에서 임포트 해야함
  fetchUser(
    @Context() context: IContext, // 인자로 받는 context 에는 req, res 등의 정보가 들어감
  ): string {
    // 유저 정보 확인하기
    console.log('===============');
    console.log(context.req.user);
    console.log('===============');
    return '인가에 성공했습니다.';
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }
}
