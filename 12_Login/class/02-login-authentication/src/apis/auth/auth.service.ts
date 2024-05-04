import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceLogin,
  IUsersServiceGetAccessToken,
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

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // 3. 일치하는 유저가 있지만 비밀번호가 틀렸다면 에러 던지기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. 일치하는 유저도 있고, 비밀번호도 맞았다면
    //    => accessToken(=JWT 토큰) 만들어 브라우저에 전달
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IUsersServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id }, //
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }
}
