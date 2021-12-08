import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Problem, ProblemSeed } from '../interfaces/problem';

@Component({
  selector: 'app-probsheet',
  templateUrl: './probsheet.component.html',
  styleUrls: ['./probsheet.component.scss']
})
export class ProbsheetComponent implements OnInit {

  isFavorite: boolean = false;

   @Input() problem: ProblemSeed = {title:"", description: "",comments:""};


  constructor(private router: Router) { }


  ngOnInit(): void {}



  openTrick(){
    this.router.navigate(['solution']);
  }

  clickFavorite(){
    this.isFavorite = !this.isFavorite;
  }
  clickEdit(event: unknown){
    console.log(event)
    this.router.navigate(['edit'])
  }

}
