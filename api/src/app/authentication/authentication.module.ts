import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '/@/config/config.module';
import { UsersModule } from '../users/users.module';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn')
        }
      }),
      inject: [ConfigService]
    })
  ],

  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy]
})
export class AuthenticationModule {}
