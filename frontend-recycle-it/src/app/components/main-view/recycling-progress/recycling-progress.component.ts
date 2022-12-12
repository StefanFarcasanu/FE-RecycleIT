import { Component, OnInit } from '@angular/core';
import {RecyclingProgressService} from "../../../services/recycling-progress.service";
import {RequestModel} from "../../../models/request.model";

@Component({
  selector: 'app-recycling-progress',
  templateUrl: './recycling-progress.component.html',
  styleUrls: ['./recycling-progress.component.css']
})
export class RecyclingProgressComponent implements OnInit {

  progressBar! : HTMLDivElement;

  circles! : NodeListOf<HTMLDivElement>;

  currentActive = 0;

  milestone1: number;

  milestone2: number;

  milestone3: number;

  milestone4: number;

  constructor(private recyclingProgressService: RecyclingProgressService) {
    this.milestone1 = 0.5;
    this.milestone2 = 1;
    this.milestone3 = 2;
    this.milestone4 = 4;
  }

  generateGoalValues() {
    this.recyclingProgressService.getAllVouchersForClient()
      .subscribe(data => {
          let nrOfVouchers = data.body.length;

          // Populate the milestone values based on the number of vouchers
          if (nrOfVouchers <= 3) {
            this.milestone1 = 0.5;
          } else if (nrOfVouchers <= 7) {
            this.milestone1 = 6;
          } else if (nrOfVouchers <= 11) {
            this.milestone1 = 14;
          }

          // Treat the case if first milestone is 0.5
          if (this.milestone1 == 0.5) {
            this.milestone2 = 1;
            this.milestone3 = 2;
            this.milestone4 = 4;
          } else {
            this.milestone2 = this.milestone1 + 2;
            this.milestone3 = this.milestone2 + 2;
            this.milestone4 = this.milestone3 + 2;
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
      // generateGoalValues();
    }

    this.currentActive > this.circles.length && (this.currentActive = this.circles.length);
  };

  claimVoucherForCurrentMilestone() {
    this.incrementCurrent();
    this.updateCircleState();
  }
}
