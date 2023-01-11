export class RecycleRequestDto {
  id!: number;
  clientId!: number;
  companyId!: number;
  quantity!: number;
  type!: string;
  status!: string;


  constructor(clientId: number, companyId: number, quantity: number, type: string) {
    this.clientId = clientId;
    this.companyId = companyId;
    this.quantity = quantity;
    this.type = type;
  }

}
