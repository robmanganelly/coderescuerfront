import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { DataService } from '../services/data.service';
import { SnackService } from '../services/snack.service';
import { UserConstructor } from '../utils/userConstructor';

@Component({
  selector: 'app-probsheet',
  templateUrl: './probsheet.component.html',
  styleUrls: ['./probsheet.component.scss']
})
export class ProbsheetComponent implements OnInit, OnDestroy {

  globalUnSubscriber  = new Subject<boolean>();

  isFavorite: boolean = false;
  currentUser: UserConstructor|null = null;


   @Input() problem: Problem = { author:{_id:"", username:""}, title:"", description: "",comments:"", language: "", date: new Date(), is_New:false};


  constructor(
    private dataService: DataService,
    private snackBarService: SnackService,
    private router: Router) { }


  ngOnInit(): void {
   this.dataService.userBehaviorSubject
   .pipe(takeUntil(this.globalUnSubscriber))
   .subscribe(user=>{
      this.currentUser=user;
      this.isFavorite = !!user?.favProblems.includes(this.problem._id as string)
      console.log(this.problem._id);
      console.log(this.isFavorite);
    });
  }
  ngOnDestroy(): void {
      this.globalUnSubscriber.next(true);
      this.globalUnSubscriber.complete();
  }



  openTrick(){
    this.router.navigate(['problem',`${this.problem._id}`,'solutions'],{ state:{ activeProblem: this.problem }});
  }

  clickFavorite(){
    if(!this.currentUser){
      this.snackBarService.primarySnack('you must log in or create an account before posting');
      this.router.navigate(['auth']);
      return;
    }
    this.isFavorite = !this.isFavorite;
    this.dataService.manageFavorites(
      this.problem._id as string,
      this.isFavorite?"add":"remove",
      "problems"
    )
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
      ()=>this.snackBarService.primarySnack(`problem ${this.isFavorite? "added to": "removed from" } favorites`,3500,"bottom")
    )
  }

}
