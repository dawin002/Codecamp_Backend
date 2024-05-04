import { User } from 'src/apis/users/entities/user.entity';

export interface IAuthServiceLogin {
  email: string;
  password: string;
}

export interface IUsersServiceGetAccessToken {
  user: User;
}
