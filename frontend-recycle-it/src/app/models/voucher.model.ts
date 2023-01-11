export class VoucherModel {
  constructor(
    public id: number,
    private clientId: Number,
    private retailerId: Number | String,
    public value: Number,
    public details: String,
    public code: String,
    public status: String,
    public validUntil: Date
  ) {
  }

  get _id() {
    return this.id;
  }

  get _clientId() {
    return this.clientId;
  }

  get _retailerId() {
    return this.retailerId;
  }
}
