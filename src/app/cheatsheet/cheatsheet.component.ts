import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cheatsheet',
  templateUrl: './cheatsheet.component.html',
  styleUrls: ['./cheatsheet.component.scss']
})
export class CheatsheetComponent implements OnInit {

  filterOptions?: string;

  newTrickForm: FormGroup = new FormGroup({
    'newTrickTitle': new FormControl(''),
    'newTrickSolution': new FormControl(''),
    'newTrickComment': new FormControl(''),

  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitNewTrick():void{
    alert('form submitted')
  }

}
