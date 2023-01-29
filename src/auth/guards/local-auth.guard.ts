import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  // overrides the parent function
  override async logIn<TRequest extends { logIn: any } = any>(
    request: TRequest,
  ): Promise<void> {
    await super.logIn(request);
  }
  // overrides the parent function
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("i'm the auth guard");
    // calling the validate function of strategy
    // if good attach the data to the request object;
    // if not this will throw
    const request1 = context.switchToHttp().getRequest() as Request;
    //console.log({ request1 });
    await super.canActivate(context);
    const request2 = context.switchToHttp().getRequest() as Request;
    //console.log({ request2 });
    //uses serialize user to add the user to request object from session object
    await this.logIn(request2);

    return true;
  }
}
