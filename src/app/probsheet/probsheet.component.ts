import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-probsheet',
  templateUrl: './probsheet.component.html',
  styleUrls: ['./probsheet.component.scss']
})
export class ProbsheetComponent implements OnInit {

  isFavorite: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickFavorite(){
    this.isFavorite = !this.isFavorite;
  }
  clickEdit(event: unknown){
    console.log(event)
    alert('edit clicked')
  }

}
