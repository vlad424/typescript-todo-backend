export class AuthDtoRegister {
  email: string;
  last_name: string;
  first_name: string;
  login: string;
  password: string;
}
export class AuthDtoAuth {
  email?: string
  login?: string
  password: string
}