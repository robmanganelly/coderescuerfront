import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-probsheet',
  templateUrl: './probsheet.component.html',
  styleUrls: ['./probsheet.component.scss']
})
export class ProbsheetComponent implements OnInit {

  isFavorite: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }



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
