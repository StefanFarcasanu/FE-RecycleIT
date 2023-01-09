import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-national-statistics',
  templateUrl: './national-statistics.component.html',
  styleUrls: ['./national-statistics.component.css']
})
export class NationalStatisticsComponent implements OnInit {

  constructor() { }

  addCountiesAbbreviations() {
    let svgPaths = document.querySelectorAll("path");

    svgPaths.forEach(path => {
      let svgTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
      let smallestBox = path.getBBox();
      svgTextElement.setAttribute("transform",
        "translate(" + (smallestBox.x + smallestBox.width/2) + " " + (smallestBox.y + smallestBox.height/2) + ")");
      svgTextElement.textContent = path.getAttribute("name");
      svgTextElement.setAttribute("fill", "white");
      svgTextElement.setAttribute("font-size", "14");
      svgTextElement.setAttribute("pointer-events", "none");
      path.parentNode!.insertBefore(svgTextElement, path.nextSibling);
    });
  }

  ngOnInit(): void {
    this.addCountiesAbbreviations();
  }

}
