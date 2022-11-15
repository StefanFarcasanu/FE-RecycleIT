import { Component, OnInit } from '@angular/core';
import {RequestModel} from "../../../models/request.model";
import {RequestsListService} from "../../../services/requests-list.service";

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

  public requestsList: Array<RequestModel> = [];

  constructor(private _requestsListService: RequestsListService) { }

  ngOnInit(): void {
    this._requestsListService.getAllRequests()
      .subscribe(data => {
        for (let requestJSON of data.body) {
          this.requestsList.push(new RequestModel(
            requestJSON.id,
            requestJSON.clientId,
            requestJSON.companyId,
            requestJSON.type,
            requestJSON.quantity,
            requestJSON.status
          ))
        }
      },
        error => {
        alert("There was an error fetching the requests!")
      });
  }
}
