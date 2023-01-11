import {Component, OnInit} from '@angular/core';
import {CountyStatisticsModel} from "../../../models/county-statistics.model";
import {NationalStatisticsService} from "../../../services/national-statistics.service";
import {MatDialog} from "@angular/material/dialog";
import {StatisticsDialogComponent} from "./statistics-dialog/statistics-dialog.component";
import {MainPageOperationsService} from "../../../services/main-page-operations.service";

@Component({
  selector: 'app-national-statistics',
  templateUrl: './national-statistics.component.html',
  styleUrls: ['./national-statistics.component.css']
})
export class NationalStatisticsComponent implements OnInit {

  public allCountiesStats: Map<String, CountyStatisticsModel> = new Map();

  public totalQuantity!: Number;

  public totalNoVouchers!: Number;

  public totalNoClients!: Number;

  constructor(private _nationalStatisticsService: NationalStatisticsService,
              private _statisticsDialog: MatDialog,
              private _mainPageOperationsService: MainPageOperationsService) {
  }

  addCountiesAbbreviations() {
    let svgPaths = document.querySelectorAll("path");

    svgPaths.forEach(path => {
      let svgTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
      let smallestBox = path.getBBox();
      svgTextElement.setAttribute("transform",
        "translate(" + (smallestBox.x + smallestBox.width / 2) + " " + (smallestBox.y + smallestBox.height / 2) + ")");
      svgTextElement.textContent = path.getAttribute("name");
      svgTextElement.setAttribute("fill", "white");
      svgTextElement.setAttribute("font-size", "14");
      svgTextElement.setAttribute("pointer-events", "none");
      path.parentNode!.insertBefore(svgTextElement, path.nextSibling);
    });
  }

  getAllStatsForAllCounties() {
    this._nationalStatisticsService.getAllStatistics().subscribe(data => {
        for (let countyStatsJSON of data.body) {
          let countyStats = new CountyStatisticsModel(
            countyStatsJSON.countyAbbreviation,
            countyStatsJSON.countyName,
            countyStatsJSON.quantity,
            countyStatsJSON.noVouchers,
            countyStatsJSON.noClients
          );
          this.allCountiesStats.set(countyStats.countyAbbreviation, countyStats);
        }
      },
      error => {
        alert("Could not fetch statistics data for the counties!");
      });
  }

  getTotalStats() {
    this._mainPageOperationsService.getTotalQuantityOfRecycledWaste().subscribe(data => {
        this.totalQuantity = data.body;
      },
      error => {
        alert("Could not fetch the total quantity value!");
      });
    this._mainPageOperationsService.getTotalNumberOfGeneratedVouchers().subscribe(data => {
        this.totalNoVouchers = data.body;
      },
      error => {
        alert("Could not fetch the total number of generated vouchers!");
      });
    this._mainPageOperationsService.getTotalNumberOfUsers().subscribe(data => {
        this.totalNoClients = data.body;
      },
      error => {
        alert("Could not fetch the total number of clients!");
      });
  }

  ngOnInit(): void {
    this.addCountiesAbbreviations();
    this.getAllStatsForAllCounties();
    this.getTotalStats();
  }

  displayStatisticsForCounty(event: any) {
    let countyAbbr = event.target.attributes.id.value;
    let foundCounty = this.allCountiesStats.get(countyAbbr);

    this._statisticsDialog.open(StatisticsDialogComponent, {
      minHeight: "500px",
      width: "1000px",
      data: {
        name: foundCounty!.countyName,
        quantity: foundCounty!.quantity,
        noVouchers: foundCounty!.noVouchers,
        noClients: foundCounty!.noClients,
        totalQuantity: this.totalQuantity,
        totalVouchers: this.totalNoVouchers,
        totalClients: this.totalNoClients
      }
    });
  }
}
