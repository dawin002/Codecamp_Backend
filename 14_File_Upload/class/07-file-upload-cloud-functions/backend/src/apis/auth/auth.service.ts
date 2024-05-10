import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceLogin,
  IAuthServiceGetAccessToken,
  IAuthServiceSetRefreshToken,
  IAuthServiceRestoreAccessToken,
} from './interfaces/auth-service.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, //
  ) {}

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // 3. 일치하는 유저가 있지만 비밀번호가 틀렸다면 에러 던지기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. requestToken(=JWT 토큰) 만들어서 브라우저 쿠키에 저장해서 보내주기
    this.setRefreshToken({ user, context });

    // 5. 일치하는 유저도 있고, 비밀번호도 맞았다면
    //    => accessToken(=JWT 토큰) 만들어 브라우저에 전달
    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    console.log('setRefreshToken function started');

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );

    // 개발 환경 - 응답 헤더에 requestToken 저장
    context.res.setHeader(
      'set-Cookie', // 쿠키 저장 옵션
      `refreshToken=${refreshToken}; path=/;`, // 작은따옴표 아님 주의
    );

    console.log('setRefreshToken function finished');

    // 배포 환경
    // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`);
    // context.res.setHeader('Access-Control-Allow-Origin'. 'https://myfrontsite.com') // 이 주소에서만 리프레시 토큰 전달 가능하게 하기
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id }, //
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }
}
