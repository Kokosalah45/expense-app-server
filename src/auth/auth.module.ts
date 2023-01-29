import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { UserSerializer } from './user.serializer';
import * as passport from 'passport';
import * as session from 'express-session';

@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalStrategy, UserSerializer],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          name: 'ses_ID',
          secret: 'supersecret',
          saveUninitialized: true,
          resave: true,
          cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
            secure: false,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
