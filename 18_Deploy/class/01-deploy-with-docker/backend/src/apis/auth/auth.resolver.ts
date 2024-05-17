import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common/decorators';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.authService.login({ email, password, context });
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard('refresh'))
  restoreAccessToken(
    @Context() context: IContext, //
  ): string {
    // 액세스 토큰 재발급
    return this.authService.restoreAccessToken({ user: context.req.user });
  }
}
