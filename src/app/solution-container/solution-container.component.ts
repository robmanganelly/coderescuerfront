import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { Problem } from '../interfaces/problem';
import { Solution } from '../interfaces/solution';
import { DataService } from '../services/data.service';
import { SnackService } from '../services/snack.service';
import { UIFileReaderService } from '../services/uifile-reader.service';
import { StaticPath } from '../utils/static-path';
import { UserConstructor } from '../utils/userConstructor';

@Component({
  selector: 'app-solution-container',
  templateUrl: './solution-container.component.html',
  styleUrls: ['./solution-container.component.scss']
})
export class SolutionContainerComponent implements OnInit, OnDestroy {

  globalUnSubscriber = new Subject<boolean>();

  activeProblem: Problem;
  solutions: Solution[] = [];
  newSolutionRequested = false;
  personalSolutionValue: string="";
  currentLanguageImage: string = "";
  currentUser: UserConstructor| null = null;
  currentUserImage: string = StaticPath.generatePath("user-default.png");
  currentUserHasPostedThisSolutionBefore = false;

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
  ngOnDestroy(): void {
    this.globalUnSubscriber.next(true);
    this.globalUnSubscriber.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: Data)=>{
        this.solutions = data["solutions"]
        console.log(this.currentUser);
      }
    )
    this.dataService.currentLanguageSubject
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
      language=>{this.currentLanguageImage = language?.img as string;}
    )
    this.dataService.userBehaviorSubject
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
      (user: UserConstructor| null)=>{
        this.currentUserHasPostedThisSolutionBefore = this.solutions.filter(
          solution=>solution.postedBy._id === user?._id).length > 0
        this.currentUser = user;
        this.currentUserImage = !!user?StaticPath.generatePath(user.photo):StaticPath.generatePath("user-default.png");
      }
    );
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
      .pipe(
        takeUntil(this.globalUnSubscriber),
        tap(data=>{ this.snackService.successSnack("solution added")}))
      .subscribe(
        (solution)=>{ this.solutions = [solution].concat(this.solutions)}
      )
  }

  grabFileAndReadAsText(e: Event){
    return this.fileDataReader.readContent(e,this.personalSolutionForm,"solution");
   }

   onClickProfileImage(){// todo implement profile changes
     alert(!this.currentUser?"user was not detected":"user detected")
   }

}
