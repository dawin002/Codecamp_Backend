import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie; // refreshToken=dadsfhaerh...
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      // jwtFromRequest: ExtractJwt._에_쿠키의_JWT_토큰_꺼내는_함수는_없음;
      secretOrKey: '나의리프레시비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // payload = { sub: (유저ID) }

    return {
      id: payload.sub, // req.user = { id: payload.sub } 이렇게 저장됨
    };
  }
}
