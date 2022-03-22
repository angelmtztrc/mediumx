import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MaxLength(250)
  description: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty({ each: true })
  categories: number[];
}
