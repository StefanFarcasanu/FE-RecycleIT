export class VoucherDto {
  id!: number;
  clientId!: number;
  retailerId!: number;
  value!: number;
  details!: string;
  code!: string;
  status!: string;
  validUntil!: string;


  constructor(retailerId: number, value: number, details: string) {
    this.retailerId = retailerId;
    this.value = value;
    this.details = details;
  }
}
