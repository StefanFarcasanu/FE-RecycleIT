import { Component, OnInit } from '@angular/core';
import {RecyclingProgressService} from "../../../services/recycling-progress.service";
import {MatDialog} from "@angular/material/dialog";
import {
  RequestInfoDialogComponent
} from "../../recycling-company-view/requests-list/request/request-info-dialog/request-info-dialog.component";
import {RecyclingProgressDialogComponent} from "./recycling-progress-dialog/recycling-progress-dialog.component";

@Component({
  selector: 'app-recycling-progress',
  templateUrl: './recycling-progress.component.html',
  styleUrls: ['./recycling-progress.component.css']
})
export class RecyclingProgressComponent implements OnInit {

  progressBar! : HTMLDivElement;

  circles! : NodeListOf<HTMLDivElement>;

  currentActive = 0;

  milestones : number[] = [];

  constructor(private recyclingProgressService: RecyclingProgressService, private _progressInfoDialog: MatDialog) {
    this.milestones.push(0.5);
    this.milestones.push(1);
    this.milestones.push(2);
    this.milestones.push(4);
  }

  generateGoalValues() {
    this.recyclingProgressService.getAllVouchersForClient()
      .subscribe(data => {
          let nrOfVouchers = data.body.length;

          // Populate the milestone values based on the number of vouchers
          if (nrOfVouchers <= 3) {
            this.milestones[0] = 0.5;
          } else if (nrOfVouchers <= 7) {
            this.milestones[0] = 6;
          } else if (nrOfVouchers <= 11) {
            this.milestones[0] = 14;
          }

          // Treat the case if first milestone is 0.5
          if (this.milestones[0] == 0.5) {
            this.milestones[1] = 1;
            this.milestones[2] = 2;
            this.milestones[3] = 4;
          } else {
            this.milestones[1] = this.milestones[0] + 2;
            this.milestones[2] = this.milestones[1] + 2;
            this.milestones[3] = this.milestones[2] + 2;
          }

          // Find the current position based on the number of vouchers
          if (nrOfVouchers % 4 < 1) {
            this.currentActive = 1;
          } else if (nrOfVouchers % 4 < 2) {
            for (let i = 0; i < 2; i++) {
              this.incrementCurrent();
              this.updateCircleState();
            }
          } else if (nrOfVouchers % 4 < 3) {
            for (let i = 0; i < 3; i++) {
              this.incrementCurrent();
              this.updateCircleState();
            }
          } else if (nrOfVouchers % 4 < 4) {
            for (let i = 0; i < 4; i++) {
              this.incrementCurrent();
              this.updateCircleState();
            }
          }
        },
        error => {
          alert("Could not fetch the vouchers for the client!")
        });
  }

  ngOnInit(): void {
    this.progressBar = document.querySelector(".js-bar") as HTMLDivElement;
    this.circles = document.querySelectorAll(".js-circle") as NodeListOf<HTMLDivElement>;

    this.generateGoalValues();
  }

  changeBarDisplay = () => {
    const actives = document.querySelectorAll(".active");

    if (window.innerWidth >= 375 && window.innerWidth < 810) {
      this.progressBar.style.height = `${
        ((actives.length - 1) / (this.circles.length - 1)) * 100
      }%`;
    } else {
      this.progressBar.style.width = `${
        ((actives.length - 1) / (this.circles.length - 1)) * 100
      }%`;
    }
  };

  updateCircleState = () => {
    this.circles.forEach((circle, i) => {
      i < this.currentActive
        ? circle.classList.add("active")
        : circle.classList.remove("active");
    });

    this.changeBarDisplay();
  };

  incrementCurrent = () => {
    this.currentActive++;

    if (this.currentActive > this.circles.length) {
      this.currentActive = 1;
      this.generateGoalValues();
    }

    this.currentActive > this.circles.length && (this.currentActive = this.circles.length);
  };

  openProgressInfoDialog(data: any) {
    this._progressInfoDialog.open(RecyclingProgressDialogComponent, {
      minHeight: "300px",
      width: "1800px",
      data: data
    });
  }

  claimVoucherForCurrentMilestone() {
    this.recyclingProgressService.getNextMilestoneForClient()
      .subscribe(data => {
        let nextMilestone = data.body;

        if (this.milestones[this.currentActive - 1] < nextMilestone) {
          this.recyclingProgressService.claimVoucherForClient(this.milestones[this.currentActive - 1])
            .subscribe(data => {

              // Verify if there is a voucher available
              if (data.body != null) {
                this.incrementCurrent();
                this.updateCircleState();
                this.openProgressInfoDialog(data.body);
              } else {
                this.openProgressInfoDialog(null);
              }
            },
            error => {
              alert(error);
            })
        }
      },
      error => {
        alert("Could not fetch the next milestone!");
      });
  }
}
