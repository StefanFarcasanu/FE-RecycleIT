import {Component, OnInit} from '@angular/core';
import {ComplexRequestModel} from "../../../models/complex-request.model";
import {RequestsListService} from "../../../services/requests-list.service";
import {LoginService} from "../../../services/login-service";
import {UserDto} from "../../../models/userDto";
import {CompanyModel} from "../../../models/company.model";

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

  public requestsList: Array<ComplexRequestModel> = [];

  constructor(private _requestsListService: RequestsListService, private _loginService: LoginService) {
  }

  ngOnInit(): void {
    this._requestsListService.getAllRequestsForCompany()
      .subscribe(data => {
          for (let requestJSON of data.body) {
            let associatedClient = new UserDto(
              requestJSON.client.id,
              requestJSON.client.firstname,
              requestJSON.client.lastname,
              requestJSON.client.email,
              "",
              requestJSON.client.county,
              requestJSON.client.city,
              ""
            );
            let associatedCompany = new CompanyModel(
              requestJSON.company.id,
              requestJSON.company.firstname,
              requestJSON.company.email,
              requestJSON.company.county,
              requestJSON.company.city
            );
            this.requestsList.push(new ComplexRequestModel(
              requestJSON.id,
              associatedClient,
              associatedCompany,
              requestJSON.type,
              requestJSON.quantity,
              requestJSON.status,
              new Date(requestJSON.date + "Z")
            ))
          }
        },
        error => {
          if (error.error !== "There are no requests for this company!") {
            alert("There was an error fetching the requests!")
          }
        });
  }

  logout() {
    this._loginService.logout();
  }
}
