import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Problem } from '../interfaces/problem';
import { Solution } from '../interfaces/solution';
import { DataService } from '../services/data.service';
import { SnackService } from '../services/snack.service';
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
  currentLanguageImage: string = "";

  personalSolutionForm = new FormGroup({
    "solution": new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2500)])

  });


  constructor(
    private snackService: SnackService,
    private dataService: DataService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private fileDataReader: UIFileReaderService) {
    this.activeProblem = this.router.getCurrentNavigation()?.extras.state?.['activeProblem']
   }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: Data)=>{
        this.solutions = data["solutions"],
        console.log(this.solutions);
      }
    )
    this.dataService.currentLanguageSubject.subscribe(
      language=>{this.currentLanguageImage = language?.img as string;}
    )
  }
  goBack(){
    this.location.back();
  }

  createNewSolutionClicked():void{
    this.newSolutionRequested = !this.newSolutionRequested;
  }

  createNewSolutionSubmit(): void{
    this.dataService
      .postSolution(this.activeProblem._id as string,this.personalSolutionForm.get('solution')?.value)
      .pipe(tap(data=>{ this.snackService.successSnack("solution added")}))
      .subscribe(
        (solution)=>{ this.solutions = [solution].concat(this.solutions)}
      )
  }

  grabFileAndReadAsText(e: Event){
    return this.fileDataReader.readContent(e,this.personalSolutionForm,"solution");
   }

}
