import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Problem } from '../interfaces/problem';
import { Solution } from '../interfaces/solution';

@Component({
  selector: 'app-solution-container',
  templateUrl: './solution-container.component.html',
  styleUrls: ['./solution-container.component.scss']
})
export class SolutionContainerComponent implements OnInit {

  activeProblem: Problem;
  solutions: Solution[] = [];


  constructor(private router: Router, private location: Location, private activatedRoute: ActivatedRoute) {
    this.activeProblem = this.router.getCurrentNavigation()?.extras.state?.['activeProblem']
   }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: Data)=>{
        this.solutions = data["solutions"]
      }
    )
  }
  goBack(){
    this.location.back();
  }

}
