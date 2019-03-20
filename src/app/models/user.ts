
export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  phone?: string;
  token?: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;

  }
}
