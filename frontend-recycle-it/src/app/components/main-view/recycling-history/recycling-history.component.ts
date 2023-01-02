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
    console.log('here');
  }

  ngOnInit(): void {
    this.getRecyclingHistory();
  }

  getRecyclingHistory() {
    console.log('here');
    this._recyclingHistoryService.getRecyclingHistory()
      .subscribe(data => {
          for (let requestJSON of data.body) {
            console.log(data.body);
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
          if (error.error !== "There are no recycling history items for this company!") {
            alert("There was an error fetching the recycling history list!")
          }
        });
  }

  backAction() {
    this._location.back();
  }
}
