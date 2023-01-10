import {CompanyModel} from "./company.model";

export class RecyclingHistoryModel {
  constructor(
    private _company: CompanyModel,
    public _quantity: Number,
    public _type: String,
    public _status: String,
    public _date: Date,
  ) {
  }

  get company(): CompanyModel {
    return this._company;
  }

  get quantity(): Number {
    return this._quantity;
  }

  get type(): String {
    return this._type;
  }

  get status(): String {
    return this._status;
  }

  get date(): Date {
    return this._date;
  }
}
