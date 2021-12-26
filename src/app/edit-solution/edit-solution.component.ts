import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { ProblemSeed } from '../interfaces/problem';
import { Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UIFileReaderService } from '../services/uifile-reader.service';
import { SnackService } from '../services/snack.service';
import { UserConstructor } from '../utils/userConstructor';

@Component({
  selector: 'app-edit-solution',
  templateUrl: './edit-solution.component.html',
  styleUrls: ['./edit-solution.component.scss']
})
export class EditSolutionComponent implements OnInit, OnDestroy {

  globalUnSubscriber = new Subject<boolean>();

  currentUser: UserConstructor|null = null;
  currentLanguageId: string = "";
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
    private snackBarService: SnackService,
    private uiFileReader: UIFileReaderService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private location: Location) {}

  ngOnDestroy(): void {
    this.globalUnSubscriber.next(true);
    this.globalUnSubscriber.complete();
  }

  ngOnInit(): void {

    this.dataService.currentLanguageSubject
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
      lang=>{this.currentLanguageId = lang?._id as string;}
    );

    this.dataService.userBehaviorSubject
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
      user=>{this.currentUser = user;}
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
    .pipe(takeUntil(this.globalUnSubscriber))
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
}
