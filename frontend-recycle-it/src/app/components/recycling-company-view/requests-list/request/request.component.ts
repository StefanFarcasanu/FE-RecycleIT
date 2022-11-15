import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../../../../services/request.service";
import {RequestModel} from "../../../../models/request.model";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input() _requestId!: Number;

  @Input() _clientId!: Number;

  @Input() _companyId!: Number;

  @Input() _wasteType!: String;

  @Input() _wasteQuantity!: Number;

  @Input() _requestStatus!: String;

  public _isPending: boolean = true;

  public _isLoading = false;

  constructor(private _requestService: RequestService) {
  }

  ngOnInit(): void {
    if (this._requestStatus !== "PENDING") {
      this._isPending = false;
    }
  }

  updateRequest(updatedStatus: String) {
    const updatedRequest = new RequestModel(
      this._requestId,
      this._clientId,
      this._companyId,
      this._wasteType,
      this._wasteQuantity,
      updatedStatus
    );

    this._isLoading = true
    this._requestService.updateRequest(updatedRequest).subscribe(
      data => {
        this._isPending = false;
        this._requestStatus = data.body.status;
        this._isLoading = false;
      },
      error => {
        alert("There was an error updating the request!")
        this._isLoading = false;
      }
    );
  }

  approveRequest(): void {
    this.updateRequest("CONFIRMED");
  }

  declineRequest(): void {
    this.updateRequest("DECLINED");
  }
}
