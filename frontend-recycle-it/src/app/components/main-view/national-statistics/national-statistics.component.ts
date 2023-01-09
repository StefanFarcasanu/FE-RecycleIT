import {Component, OnInit} from '@angular/core';
import {CountyStatisticsModel} from "../../../models/county-statistics.model";
import {NationalStatisticsService} from "../../../services/national-statistics.service";

@Component({
  selector: 'app-national-statistics',
  templateUrl: './national-statistics.component.html',
  styleUrls: ['./national-statistics.component.css']
})
export class NationalStatisticsComponent implements OnInit {

  public allCountiesStats: Array<CountyStatisticsModel> = [];

  constructor(private _nationalStatisticsService: NationalStatisticsService) {
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
          this.allCountiesStats.push(countyStats);
        }
        console.log(this.allCountiesStats);
      },
      error => {
        alert("Could not fetch statistics data for the counties!");
      })
  }

  ngOnInit(): void {
    this.addCountiesAbbreviations();
    this.getAllStatsForAllCounties();
  }

  displayStatisticsForCounty(event: any) {
    let countyAbbr = event.target.attributes.id.value;


  }
}
