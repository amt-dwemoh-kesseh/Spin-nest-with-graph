import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}