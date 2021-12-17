import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Problem } from '../interfaces/problem';
import { Solution } from '../interfaces/solution';
import { UIFileReaderService } from '../services/uifile-reader.service';

@Component({
  selector: 'app-solution-container',
  templateUrl: './solution-container.component.html',
  styleUrls: ['./solution-container.component.scss']
})
export class SolutionContainerComponent implements OnInit {

  activeProblem: Problem;
  solutions: Solution[] = [];
  newSolutionRequested = false;
  personalSolutionValue: string="";

  personalSolutionForm = new FormGroup({
    "solution": new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2500)])

  });


  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private fileDataReader: UIFileReaderService) {
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

  createNewSolutionClicked():void{
    this.newSolutionRequested = !this.newSolutionRequested;
  }

  createNewSolutionSubmit(): void{
    // todo
  }

  grabFileAndReadAsText(e: Event){
    return this.fileDataReader.readContent(e,this.personalSolutionForm,"solution");
   }

}
