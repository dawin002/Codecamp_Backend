import { Request, Response } from 'express';

export interface IContext {
  // express 의 Request import 해야함 (NestJS는 express 기반으로 동작해서)
  req: Request & IAuthUser;
  res: Response;
}

export interface IAuthUser {
  user?: {
    id: string;
  };
}
