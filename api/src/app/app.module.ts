import { Module } from '@nestjs/common';

import { ConfigModule } from '/@/config/config.module';
import { PostgresModule } from '/@/database/postgres.module';

import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule,
    PostgresModule,

    ArticlesModule,
    UsersModule,
    CategoriesModule,
    CommentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
