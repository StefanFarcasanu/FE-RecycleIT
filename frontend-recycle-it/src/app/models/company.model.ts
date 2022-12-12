export class CompanyModel {
  constructor(
    private id: Number,
    public firstname: String,
    public email: String,
    public county: String,
    public city: String,
  ) {
  }

  get _id() {
    return this.id;
  }
}
