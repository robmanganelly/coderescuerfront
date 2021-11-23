import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-solution',
  templateUrl: './edit-solution.component.html',
  styleUrls: ['./edit-solution.component.scss']
})
export class EditSolutionComponent implements OnInit {

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
