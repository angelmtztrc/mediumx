import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticateUserDto {
  @IsNotEmpty({ message: 'The $property is empty.' })
  @IsEmail({}, { message: 'The $value is not an email.' })
  email: string;

  @IsString({ message: 'The $property must be a string.' })
  @MinLength(6, { message: 'The $property must be at least 6 characters long.' })
  password: string;
}
