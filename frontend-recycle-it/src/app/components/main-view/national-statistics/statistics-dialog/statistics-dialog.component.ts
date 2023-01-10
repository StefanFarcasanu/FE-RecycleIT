import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChartOptions} from "chart.js";

@Component({
  selector: 'app-statistics-dialog',
  templateUrl: './statistics-dialog.component.html',
  styleUrls: ['./statistics-dialog.component.css']
})
export class StatisticsDialogComponent implements OnInit {

  _countyName!: String;

  _countyQuantity!: Number;

  _countyNoVouchers!: Number;

  _countyNoClients!: Number;

  public quantityPieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false
  };

  public noVouchersPieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false
  }

  public noClientsPieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false
  }

  public quantityPieChartLabels = ["Selected county", "Other counties"];

  public noVouchersPieChartLabels = ["Selected county", "Other counties"];

  public noClientsPieChartLabels = ["Selected county", "Other counties"];

  public quantityPieChartDatasets;

  public noVouchersPieChartDatasets;

  public noClientsPieChartDatasets;

  public quantityPieChartLegend = true;

  public noVouchersPieChartLegend = true;

  public noClientsPieChartLegend = true;

  public quantityPieChartPlugins = [];

  public noVouchersPieChartPlugins = [];

  public noClientsPieChartPlugins = [];

  constructor(private dialogRef: MatDialogRef<StatisticsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public countyData: any) {

    this._countyName = countyData["name"];
    this._countyQuantity = countyData["quantity"];
    this._countyNoVouchers = countyData["noVouchers"];
    this._countyNoClients = countyData["noClients"];

    this.quantityPieChartDatasets = [{
      data: [this._countyQuantity, 300]
    }];
    this.noVouchersPieChartDatasets = [{
      data: [this._countyNoVouchers, 300]
    }];
    this.noClientsPieChartDatasets = [{
      data: [this._countyNoVouchers, 300]
    }];
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
