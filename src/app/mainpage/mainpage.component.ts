import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lang } from '../interfaces/lang';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  languageList: Lang[] = [];

  constructor(private router: Router) { }
  onTestClick(lang: Lang):void{
    // todo request data from server before navigating
    this.router.navigate(['tricks']);
  }

  ngOnInit(): void {
    this.languageList = [
      { name: 'Python', image:'assets/python.png'},
      { name: 'Javascript', image:'assets/javascript-logo-transparent-logo-javascript-images-3.png'},
      { name: 'Typescript', image:'assets/Typescript_logo_2020.svg.png'},
      { name: 'Java', image:'assets/java-logo.png'}
    ]
  }

}
