import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtensionTest } from '../utils/extensions';
import { UIFileReaderService } from '../services/uifile-reader.service';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-edit-solution',
  templateUrl: './edit-solution.component.html',
  styleUrls: ['./edit-solution.component.scss']
})
export class EditSolutionComponent implements OnInit {

  currentLanguageId: string = "";
  path: boolean = true;
  solutionValue: string = "";
  onEdition: Problem | undefined;
  formPurpose: string = ""

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
    private snackBarService: SnackService,
    private uiFileReader: UIFileReaderService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private location: Location) {

      this.onEdition = this.router.getCurrentNavigation()?.extras.state?.['problem'];
      this.formPurpose = this.router.getCurrentNavigation()?.extras.state?.['action'];
     }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
     (p)=>{ this.path = !!p["id"]}
    )

    this.dataService.currentLanguageSubject.subscribe(
      lang=>{this.currentLanguageId = lang?._id as string;}
    );

    if(!!this.onEdition){
      this.newTrickForm.get("newTrickTitle")?.setValue(this.onEdition.title);
      this.newTrickForm.get("newTrickDescription")?.setValue(this.onEdition.description);
    }

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
        this.snackBarService.successSnack(" code recipe successfully added ");
        this.newTrickForm.reset();
        this.newTrickForm.markAsPristine();
      }
    )
    }

  grabFileAndReadAsText(e: Event){
    return this.uiFileReader.readContent(e,this.newTrickForm,"newTrickSolution");
  }

  fixContent(owner: boolean = false):boolean { // used to tell component's template if make input readonly or not
    if (owner){
      return /update-trick-user/.test(this.formPurpose);
    }
    return /update/.test(this.formPurpose)
  }


}
