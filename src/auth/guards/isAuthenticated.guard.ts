import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class IsAuthenticated extends AuthGuard('local') {
  constructor() {
    super();
  }
  // overrides the parent function
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("i'm the isauth guard");
    const request = context.switchToHttp().getRequest() as Request;

    return request.isAuthenticated();
  }
}
