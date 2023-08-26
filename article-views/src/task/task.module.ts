import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [
    ArticleModule
  ],
  providers: [TaskService]
})
export class TaskModule {}
