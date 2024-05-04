import { Request, Response } from 'express';

export interface IAuthUser {
  user?: {
    email: string;
    id: string;
  };
}

export interface IContext {
  // express 의 Request import 해야함 (NestJS는 express 기반으로 동작해서)
  req: Request & IAuthUser;
  res: Response;
}
