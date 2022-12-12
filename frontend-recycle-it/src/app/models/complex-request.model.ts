import {UserDto} from "./userDto";
import {CompanyModel} from "./company.model";

export class ComplexRequestModel {
  constructor(
    private id: Number,
    private client: UserDto,
    private company: CompanyModel,
    public type: String,
    public quantity: Number,
    public status: String,
    public dateCreated: Date
  ) {
  }

  get _id() {
    return this.id;
  }

  get _client() {
    return this.client;
  }

  get _company() {
    return this.company;
  }
}
