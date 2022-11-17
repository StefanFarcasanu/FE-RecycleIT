export class UserDto {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  county!: string;
  city!: string;
  role!: string;


  constructor(id: number, firstname: string, lastname: string, email: string, password: string, county: string, city: string, role: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.county = county;
    this.city = city;
    this.role = role;
  }
}
