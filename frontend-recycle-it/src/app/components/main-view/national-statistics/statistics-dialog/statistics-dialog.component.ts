import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ChartConfiguration, ChartData, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-statistics-dialog',
  templateUrl: './statistics-dialog.component.html',
  styleUrls: ['./statistics-dialog.component.css']
})
export class StatisticsDialogComponent implements OnInit {
  public pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public pieChartLabels = ["Selected county", "Other counties"];
  public pieChartDatasets = [ {
    data: [100, 200]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dialogRef: MatDialogRef<StatisticsDialogComponent>) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
