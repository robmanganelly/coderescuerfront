import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Lang } from '../interfaces/lang';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  languageList: Lang[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }
  onTestClick(lang: Lang):void{
    // todo request data from server before navigating
    this.router.navigate(['tricks']);
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(
      (response: Data)=>{
        this.languageList = response['languages'].data.data;
      }
    );

    // this.languageList = [
      // { name: 'Python', img:'assets/python.png'},
      // { name: 'Javascript', img:'assets/javascript-logo-transparent-logo-javascript-images-3.png'},
      // { name: 'Typescript', img:'assets/Typescript_logo_2020.svg.png'},
      // { name: 'Java', img:'assets/java-logo.png'}
    // ]

  }

}
