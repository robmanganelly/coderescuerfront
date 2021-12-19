import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-probsheet',
  templateUrl: './probsheet.component.html',
  styleUrls: ['./probsheet.component.scss']
})
export class ProbsheetComponent implements OnInit {

  isFavorite: boolean = false;

   @Input() problem: Problem = {title:"", description: "",comments:"", language: "", date: new Date(), is_New:false};


  constructor(
    private dataService: DataService,
    private router: Router) { }


  ngOnInit(): void {
    console.log(this.problem);
  }



  openTrick(){
    this.router.navigate(['problem',`${this.problem._id}`,'solutions'],{ state:{ activeProblem: this.problem }});
  }

  clickFavorite(){
    this.isFavorite = !this.isFavorite;
  }
  clickEdit(){
    this.router.navigate(['edit'],{state:{ problem: this.problem, action: "update-trick-owner" }});
  }

}
