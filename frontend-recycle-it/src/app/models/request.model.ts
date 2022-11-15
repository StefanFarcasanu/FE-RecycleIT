export class RequestModel {
  constructor(
    private id: Number,
    private clientId: Number,
    private companyId: Number,
    public type: String,
    public quantity: Number,
    public status: String
  ) {
  }

  get _id() {
    return this.id;
  }

  get _clientId() {
    return this.clientId
  }

  get _companyId() {
    return this.companyId;
  }
}
