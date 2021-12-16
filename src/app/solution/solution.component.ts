import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SnackService } from '../services/snack.service';
import { Problem } from '../interfaces/problem';
import { DataService } from '../services/data.service';
import { Solution } from '../interfaces/solution';
import { Comment } from '../interfaces/comment';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {

  displayComments = false;

  formComment: FormGroup = new FormGroup({
    'comment': new FormControl()
  })

  @Input() currentSolution!: Solution;
  @Input() activeProblem!: Problem;
  // comments: Comment[] = []
  comments: number[] = []

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

  ngOnInit(): void {
    if(!this.activeProblem || !this.currentSolution){
      this.router.navigate(['']);
    }
    console.log(this.activeProblem);
    console.log(this.currentSolution);

  }


  clickEdit(action: string):void{
    alert('must navigate to create solution component: fake --must be implemented--') // todo implement
    this.router.navigate(['edit']);
  }

  async clickCopy(container: HTMLPreElement):Promise<void>{ //todo
    try{
      await navigator.clipboard.writeText(container.innerText);
      this.snackBarService.successSnack('content copied successfully',1000,'bottom')
    }catch(err){
      this.snackBarService.warnSnack('content can not be copied',1000,'bottom')
    }
  }
  clickFavorite():void{
    this.favorite = !this.favorite;
    this.snackBarService.primarySnack(`this item was ${this.favorite?'flagged as favorite': 'removed from your favorites'}`,1000,'bottom')
    if (this.favorite) {this.dislike = false;}
  }
  clickLike():void{
    this.like = !this.like;
    this.snackBarService.primarySnack(`this item was ${this.like?'liked': 'removed from your liked items'}`,1000,'bottom')
    if(this.like){this.dislike = false;}
  }
  clickDislike():void{
    this.dislike = !this.dislike;
    this.snackBarService.primarySnack(`this item was ${this.dislike?'disliked': 'removed from your disliked items'}`,1000,'bottom')
    if(this.dislike){
      this.like = false;
      this.favorite = false;
    }
  }

  postComment():void{
    //todo place logic
  }

  toggleButton(event: any):void{
    console.log(event);
    this.displayComments = event.source.checked;
  }



}
