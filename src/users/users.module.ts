import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DbConnectService } from 'src/db-connect/db-connect.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [UsersResolver, UsersService, DbConnectService],
  exports: [UsersService],
})
export class UsersModule {}