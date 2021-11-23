import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cheatsheet',
  templateUrl: './cheatsheet.component.html',
  styleUrls: ['./cheatsheet.component.scss']
})
export class CheatsheetComponent implements OnInit {

  filterOptions?: string;
  languageTricks : number[] = [1,2,3,4,5,6,7,8,9,1,1,2,2,2,2,2,22,2,2,2,2,2,2,22,2,2,22,2,2,22,2,2,22,2,22,2,22,2,22,2,2,22,2,22]
  // this is a fake data, must be replaced with a real object containing all information about objects (10-20 max at a time)



  constructor() { }

  ngOnInit(): void {
  }



}
