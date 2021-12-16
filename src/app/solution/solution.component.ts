import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SnackService } from '../services/snack.service';
import { Problem } from '../interfaces/problem';
import { DataService } from '../services/data.service';
import { Solution } from '../interfaces/solution';

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


  comments: number[] = [1,1,11,1,1,11,1,11,1,1,11]

  myComment: string = 'leave a comment here'

  favorite: boolean = false;
  like: boolean = false;
  dislike: boolean = false;

  activeProblem: Problem;
  solutions: Solution[] = [];

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBarService: SnackService
    ) {
      this.activeProblem = this.router.getCurrentNavigation()?.extras.state?.['activeProblem']
     }

  ngOnInit(): void {
    if(!this.activeProblem){
      this.router.navigate(['']);
      return;
    }
    this.activatedRoute.data.subscribe(
      (data: Data)=>{
        this.solutions = data["solutions"]
      }
    )
  }
  goBack(){
    this.location.back();
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
