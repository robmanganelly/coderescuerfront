import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {

  formComment: FormGroup = new FormGroup({
    'comment': new FormControl()
  })

  comments: number[] = [1,1,11,1,1,11,1,11,1,1,11]

  myComment: string = 'leave a comment here'

  favorite: boolean = false;
  like: boolean = false;
  dislike: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickEdit():void{
    alert('must navigate to create solution component: fake --must be implemented--') // todo implement
  }

  clickCopy():void{ //todo
    alert('content copied: fake --must be implemented--')

  }
  clickFavorite():void{
    this.favorite = !this.favorite;
    if (this.favorite) {this.dislike = false;}
  }
  clickLike():void{
    this.like = !this.like;
    if(this.like){this.dislike = false;}
  }
  clickDislike():void{
    this.dislike = !this.dislike;
    if(this.dislike){
      this.like = false;
      this.favorite = false;
    }

  }

  postComment():void{
    //todo place logic
  }

}
