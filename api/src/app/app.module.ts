import { Module } from '@nestjs/common';

import { ConfigModule } from '/@/config/config.module';
import { PostgresModule } from '/@/database/postgres.module';

@Module({
  imports: [ConfigModule, PostgresModule],
  controllers: [],
  providers: []
})
export class AppModule {}
