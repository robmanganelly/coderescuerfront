import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { ProblemSeed } from '../interfaces/problem';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ExtensionTest } from '../utils/extensions';

@Component({
  selector: 'app-edit-solution',
  templateUrl: './edit-solution.component.html',
  styleUrls: ['./edit-solution.component.scss']
})
export class EditSolutionComponent implements OnInit {

  currentLanguageId: string = "";

  path: boolean = true;
  solutionValue: string = "";

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
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
     p=>{ this.path = !!p["id"]}
    )

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
    .subscribe(
      ()=>{
        alert("success");
        this.newTrickForm.reset();
        this.newTrickForm.markAsPristine();
      }
    )
    }

  grabFileAndReadAsText(e: Event){
   const File: File = ((e.target as HTMLInputElement).files as FileList)[0];
   const reader = new FileReader();

   reader.onload = (ev)=>{//define reader behavior

   if(!ExtensionTest.isValidExtension(File.name)){
    return alert(`unsupported extension <${ExtensionTest.findExtension(File.name)}> for a text file`) // create proper handler (snackbar)
   }

   this.solutionValue = reader.result as string;
   this.newTrickForm.get("newTrickSolution")?.setValue(reader.result as string)
   }

   reader.readAsText(File);

  }


}
