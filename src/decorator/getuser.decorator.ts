import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { account } from 'src/model/account.model';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): account => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
