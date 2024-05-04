import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// 다른 인가 전략으로 처리하는 패턴
// import { KakaoStrategy } from 'passport-kakao';
// import { NaverStrategy } from 'passport-naver';
// import { GoogleStrategy } from 'passport-google';
// 임포트한 다음 extends PassportStrategy() 의 인자에 넣어줌

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const temp = req.headers.Authorization;
      //   const accessToken = temp.toLowercase().replace('bearer ', '');
      //   return accessToken;
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // payload = { sub: (유저ID), ... }
    return {
      id: payload.sub, // req.user = { id: payload.sub }
    };
  }
}
