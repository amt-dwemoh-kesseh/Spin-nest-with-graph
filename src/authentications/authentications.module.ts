import { Module } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsResolver } from './authentications.resolver';
import { DbConnectService } from 'src/db-connect/db-connect.service';
import { AuthService } from 'src/utils/jwt.auth';

@Module({
  providers: [
    AuthenticationsResolver,
    AuthenticationsService,
    DbConnectService,
    AuthService,
  ],
})
export class AuthenticationsModule {}
