export class CountyStatisticsModel {
  constructor(
    public countyAbbreviation: String,
    private countyName: String,
    private quantity: Number,
    private noVouchers: Number,
    private noClients: Number,
  ) {
  }
}
