import {Component, OnInit} from '@angular/core';
import {RecyclingHistoryService} from "../../../services/recyling-history";
import {CompanyModel} from "../../../models/company.model";
import {RecyclingHistoryModel} from "../../../models/recycling-history-model";
import {Location} from '@angular/common';

@Component({
  selector: 'app-recycling-history',
  templateUrl: './recycling-history.component.html',
  styleUrls: ['./recycling-history.component.css']
})
export class RecyclingHistoryComponent implements OnInit {

  public recyclingHistoryList: Array<RecyclingHistoryModel> = [];

  constructor(private _recyclingHistoryService: RecyclingHistoryService, private _location: Location) {
  }

  ngOnInit(): void {
    this.getRecyclingHistory();
  }

  getRecyclingHistory() {
    this._recyclingHistoryService.getRecyclingHistory()
      .subscribe(data => {
          for (let requestJSON of data.body) {
            let recyclingCompany = new CompanyModel(
              requestJSON.company.id,
              requestJSON.company.firstname,
              requestJSON.company.email,
              requestJSON.company.county,
              requestJSON.company.city
            );
            this.recyclingHistoryList.push(new RecyclingHistoryModel(
                recyclingCompany,
                requestJSON.quantity,
                requestJSON.type,
                requestJSON.status,
                new Date(requestJSON.date)
              )
            )
          }
        },
        error => {
          if (error.error !== "This client has made no recycling requests!") {
            alert("There was an error fetching the recycling history list!")
          }
        });
  }

  backAction() {
    this._location.back();
  }
}
