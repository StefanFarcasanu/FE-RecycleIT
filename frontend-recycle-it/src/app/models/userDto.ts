export class UserDto {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  county!: string;
  city!: string;
  role!: string;


  constructor(firstname: string, lastname: string, email: string, password: string, county: string, city: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.county = county;
    this.city = city;
  }
}
