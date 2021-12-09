import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { ProblemSeed } from '../interfaces/problem';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit-solution',
  templateUrl: './edit-solution.component.html',
  styleUrls: ['./edit-solution.component.scss']
})
export class EditSolutionComponent implements OnInit {

  currentLanguageId: string = "";

  // Requirements of data being validated
  titleRequirements: ValidatorFn[] = [Validators.required, Validators.minLength(10), Validators.maxLength(300)]
  solutionRequirements: ValidatorFn[] = [Validators.required, Validators.minLength(3), Validators.maxLength(3500)]
  commentsRequirements: ValidatorFn[] = [Validators.minLength(1), Validators.maxLength(2500)]
  descriptionRequirements: ValidatorFn[] = [Validators.required, Validators.maxLength(300)]

  newTrickForm: FormGroup = new FormGroup({
    'newTrickTitle': new FormControl('',this.titleRequirements),
    'newTrickDescription': new FormControl('',this.descriptionRequirements),
    'newTrickComment': new FormControl('',this.commentsRequirements),
    'newTrickSolution': new FormControl('',this.solutionRequirements),
  });

  constructor(
    private dataService: DataService,
    private location: Location) { }

  ngOnInit(): void {
    this.dataService.currentLanguageSubject.subscribe(
      lang=>{this.currentLanguageId = lang?._id as string;}
    )
  }

  goBack():void {
    this.location.back();
  }

  onSubmitNewTrick():void{
    const probData: ProblemSeed = {
      title: this.newTrickForm.get("newTrickTitle")?.value as string,
      description: this.newTrickForm.get("newTrickDescription")?.value as string,
      comments: this.newTrickForm.get("newTrickComment")?.value as string,
      solution: this.newTrickForm.get("newTrickSolution")?.value as string
    };
    this.dataService.createProblem(this.currentLanguageId, probData)
    .pipe(tap(console.log))
    .subscribe(
      ()=>alert("success")
    )
    }

  // createNewProblem(payload: ProblemSeed): void{
  //   this.dataService.createProblem(this.languageId,payload)
  //     .pipe(tap(console.log))
  //     .subscribe(

  //   )
  // }


}
