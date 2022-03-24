import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  description: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty({ each: true })
  categories: number[];

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
