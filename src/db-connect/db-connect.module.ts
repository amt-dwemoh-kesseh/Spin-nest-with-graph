import { Module } from '@nestjs/common';

import { DbConnectService } from './db-connect.service';

@Module({
  controllers: [],
  providers: [DbConnectService],
})
export class DbConnectModule {}
