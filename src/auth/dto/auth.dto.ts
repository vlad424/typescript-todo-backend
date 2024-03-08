import { IsEmail, MaxLength, MinLength } from "class-validator";

export class AuthDtoRegister {
  @IsEmail()
  email: string;

  last_name: string;
  first_name: string;

  @MinLength(4)
  @MaxLength(12)
  login: string;

  password: string;
}
export class AuthDtoAuth {
  login: string
  password: string
}
