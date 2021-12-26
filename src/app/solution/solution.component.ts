import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SnackService } from '../services/snack.service';
import { Problem } from '../interfaces/problem';
import { DataService } from '../services/data.service';
import { Solution } from '../interfaces/solution';
import { Comment } from '../interfaces/comment';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UserConstructor } from '../utils/userConstructor';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit, OnDestroy,AfterViewInit {

  globalUnSubscriber = new Subject<boolean>();

  currentUser: UserConstructor| null = null;

  displayComments = false;
  commentsAlreadyRequested = false;

  formComment: FormGroup = new FormGroup({
    'comment': new FormControl('',[Validators.required, Validators.minLength(2),
    Validators.maxLength(2500)])
  })

  updateForm: FormGroup = new FormGroup({
    'solution': new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(3500)])
  });

  @Input() currentSolution!: Solution;
  @Input() activeProblem!: Problem;

  @ViewChild('codeContainer') codeToCopy!: HTMLTextAreaElement;

  isOnEdition = false


  comments: Comment[] = []

  myComment: string = 'leave a comment here'

  favorite: boolean = false;
  like: boolean = false;
  dislike: boolean = false;


  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBarService: SnackService
    ) {}

  ngAfterViewInit(): void {
    this.updateForm.get('solution')?.setValue(this.currentSolution.solution as string)
  }
  ngOnDestroy(): void {
   this.globalUnSubscriber.next(true);
   this.globalUnSubscriber.complete();
  }

  ngOnInit(): void {
    if(!this.activeProblem || !this.currentSolution){
      this.router.navigate(['index']);
    }
    this.dataService.userBehaviorSubject
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
      user=>{
        this.currentUser = user;
        this.favorite = !!user?.favSolutions.includes(this.currentSolution._id as string)
        this.like= !user? false: this.currentSolution.liked.includes(user?._id as string)
        this.dislike = !user? false: this.currentSolution.disliked.includes(user?._id as string)
       }
    );

    this.dataService.favoritesSubject
   .pipe(takeUntil(this.globalUnSubscriber))
   .subscribe((fav)=>{
     if(!!fav.favSolutions){
       this.favorite = fav.favSolutions.includes(this.currentSolution._id as string);
     }
   });
  }


  clickEdit():void{
    this.isOnEdition = !this.isOnEdition;
  }

  // async clickCopy(container: HTMLElement):Promise<void>{ //todo
  //   try{
  //     await navigator.clipboard.writeText(container.innerText);
  //     this.snackBarService.successSnack('content copied successfully',1000,'bottom')
  //   }catch(err){
  //     this.snackBarService.warnSnack('content can not be copied',1000,'bottom')
  //   }
  // }

  async clickCopy():Promise<void>{ //todo
    try{
      await navigator.clipboard.writeText(this.codeToCopy.value);
      this.snackBarService.successSnack('content copied successfully',1000,'bottom')
    }catch(err){
      this.snackBarService.warnSnack('content can not be copied',1000,'bottom')
    }
  }

  clickFavorite():void{

    if(!this.currentUser){
      this.snackBarService.primarySnack('you must log in or create an account before posting');
      this.router.navigate(['auth']);
      return;
    }

    this.favorite = !this.favorite;
    if (this.favorite) {this.dislike = false;}

    this.dataService.manageFavorites(
      this.currentSolution._id as string,
      this.favorite?"add":"remove",
      "solutions"
    )
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
      ()=>this.snackBarService.primarySnack(`solution ${this.favorite? "added to": "removed from" } favorites`,2500,"bottom")
    )
  }
  clickLike():void{

    if(!this.currentUser){
      this.snackBarService.primarySnack('you must log in or create an account before posting');
      this.router.navigate(['auth']);
      return;
    }

    this.like = !this.like;
    if(this.like){this.dislike = false;}

    this.dataService.manageLikeState(this.currentSolution._id as string, this.detectState()).pipe(
      takeUntil(this.globalUnSubscriber)
    ).subscribe(
      _=>{
      this.snackBarService.primarySnack(`this item was ${this.like?'liked': 'removed from your liked items'}`,1000,'bottom')
    }
    )
  }
  clickDislike():void{

    if(!this.currentUser){
      this.snackBarService.primarySnack('you must log in or create an account before posting');
      this.router.navigate(['auth']);
      return;
    }


    this.dislike = !this.dislike;

    if(this.dislike){
      this.like = false;
      this.favorite = false;
    }

    this.dataService.manageLikeState(this.currentSolution._id as string, this.detectState()).pipe(
      takeUntil(this.globalUnSubscriber)
    ).subscribe(
      _=>{
      this.snackBarService.primarySnack(`this item was ${this.dislike?'disliked': 'removed from your disliked items'}`,1000,'bottom')
    }
    )
  }

  postComment():void{

    if(!this.currentUser){
      this.snackBarService.primarySnack('you must log in or create an account before posting');
      this.router.navigate(['auth']);
      return;
    }


    this.dataService.postComment(
      this.currentSolution._id as string,
      this.formComment.get("comment")?.value as string
      )
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(d=>{
        this.snackBarService.successSnack("comment created successfully",1000,"bottom","right")
        this.comments = [d].concat(this.comments);
        this.commentsAlreadyRequested = false;
        this.formComment.reset();
      })
  }

  toggleButton(event: MatSlideToggleChange):void{
    let target = event.source;

    if(!this.commentsAlreadyRequested){
      this.dataService.getCommentsFromSolution(this.currentSolution._id as string)
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
        (_comments: Comment[]) => {
          this.comments = _comments;
          this.commentsAlreadyRequested = true;
          this.displayComments = target.checked;
        }
      )
    }else{
      this.displayComments = target.checked;
    }
  }

  detectState():number{
    return 0 +(this.like? 1 : 0 ) -( this.dislike? 1 : 0 );
  }

  updateSolution(){
    this.dataService.patchSolutionIfOwner(
      this.currentSolution._id as string,
      this.updateForm.get('solution')?.value as string,).subscribe(
        (newSolution)=>{
          console.log(newSolution);
          this.currentSolution = newSolution;
          this.snackBarService.successSnack('solution updated',2000,'bottom')
          this.isOnEdition = false;
        }
      )
  }





}
