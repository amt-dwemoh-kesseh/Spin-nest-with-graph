import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DbConnectService } from 'src/db-connect/db-connect.service';
import { PostService } from './post.service';
import { AuthenticationsService } from 'src/authentications/authentications.service';
import { AuthenticationsModule } from 'src/authentications/authentications.module';
import { AuthService } from 'src/utils/jwt.auth';

@Module({
  imports: [],
  providers: [UsersResolver, UsersService, DbConnectService,PostService,AuthenticationsService,AuthService],
  exports: [UsersService],
})
export class UsersModule {}
