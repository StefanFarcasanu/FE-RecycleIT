export class VoucherDto {
  constructor(
    private retailerId: number,
    public value: number,
    public details: string,
  ) {
  }
}
