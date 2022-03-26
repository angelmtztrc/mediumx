import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
}
