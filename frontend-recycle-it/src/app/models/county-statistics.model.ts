export class CountyStatisticsModel {
  constructor(
    public countyAbbreviation: String,
    public countyName: String,
    public quantity: Number,
    public noVouchers: Number,
    public noClients: Number,
  ) {
  }
}
