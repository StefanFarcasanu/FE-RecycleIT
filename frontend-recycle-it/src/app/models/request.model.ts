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
}
