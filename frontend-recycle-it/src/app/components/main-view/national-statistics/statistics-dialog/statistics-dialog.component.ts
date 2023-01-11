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

  _countyQuantity!: number;

  _countyNoVouchers!: number;

  _countyNoClients!: number;

  _totalQuantity!: number;

  _totalNoVouchers!: number;

  _totalNoClients!: number;

  public quantityPieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Quantity of waste"
      }
    }
  };

  public noVouchersPieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Number of vouchers"
      }
    }
  }

  public noClientsPieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Number of clients"
      }
    }
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
    this._totalQuantity = countyData["totalQuantity"];
    this._totalNoVouchers = countyData["totalVouchers"];
    this._totalNoClients = countyData["totalClients"];

    console.log(this._totalNoVouchers);
    console.log(this._totalQuantity - this._countyQuantity);
    console.log(this._totalNoVouchers - this._countyNoVouchers);

    this.quantityPieChartDatasets = [{
      data: [this._countyQuantity, (this._totalQuantity - this._countyQuantity)]
    }];
    this.noVouchersPieChartDatasets = [{
      data: [this._countyNoVouchers, (this._totalNoVouchers - this._countyNoVouchers)]
    }];
    this.noClientsPieChartDatasets = [{
      data: [this._countyNoClients, (this._totalNoClients - this._countyNoClients)]
    }];
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
