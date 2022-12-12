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

  currentActive = 1;

  milestone1: number;

  milestone2: number;

  milestone3: number;

  milestone4: number;

  constructor(private recyclingProgressService: RecyclingProgressService) {
    this.milestone1 = 0.5;
    this.milestone2 = 2 * this.milestone1;
    this.milestone3 = 2 * this.milestone2;
    this.milestone4 = 2 * this.milestone3;
  }

  generateGoalValues() {
    this.recyclingProgressService.getNextMilestoneForClient()
      .subscribe(data => {
          let nextMilestone = data.body;
        },
        error => {
          alert(error.error)
        });
  }

  // generateGoalValues() {
  //   this.recyclingProgressService.getRequestsHistoryForClient()
  //     .subscribe(data => {
  //         let totalQuantityRecycledByClient = 0;
  //
  //         for (let requestJSON of data.body) {
  //           if (requestJSON.status == "CONFIRMED") {
  //             totalQuantityRecycledByClient += requestJSON.quantity
  //           }
  //         }
  //
  //
  //       },
  //       error => {
  //         alert("Could not fetch the requests history for calculating the total recycled kgs!")
  //       });
  // }

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
