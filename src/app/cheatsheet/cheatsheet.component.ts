import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Lang } from '../interfaces/lang';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cheatsheet',
  templateUrl: './cheatsheet.component.html',
  styleUrls: ['./cheatsheet.component.scss']
})
export class CheatsheetComponent implements OnInit {

  filterOptions: {[k:string]:{[k:string]:string|number|boolean}} = {
    noFilter:{skip:1, limit:10},
    newFilter:{isnew:true, skip:1, limit:10},
    favFilter:{favorites:true, skip:1, limit:10},
    add:{return: true}
  }

  languageTricks: Problem[] = []
  languageId: string = "";
  languageName: string = "";
  currentLanguage: Lang | null = null;

  limitPerPage = 10;
  totalItems = 100;

  pagSOpt= Array.from(function*(){
    let i=1;
    while (i <=50){
      if(i%5 === 0 ){yield i;}
      i++;
    }
  }());

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.currentLanguageSubject.subscribe(
      (d)=>{
        this.currentLanguage = d as Lang;
        this.languageName = d?.name as string;
        this.languageId = d?._id as string;
      }
    )
    this.activatedRoute.data.subscribe(
      (response:Data)=>{
        console.log(response);
        this.languageId = this.activatedRoute.snapshot.params['id'];
        this.languageTricks = response["problems"];
      }
    );
    this.dataService.problemsOnSelectedLanguageSubject.subscribe(
      problems=>{this.languageTricks = problems;}
    )
    if(!this.languageId || !this.currentLanguage ){ this.router.navigate([''])}
  };

  capturePageEvent(event: PageEvent){
    console.log(event)
    alert(`ok`)
  }

  refreshProblems(value: string): void{
    if(!!this.filterOptions[value]['return']){return;}
    this.dataService.getProblemsFromLanguage(this.languageId,this.filterOptions[value]).subscribe(
      (p)=>{
        this.languageTricks = p as Problem[]}
    );
    // this.dataService.getProblemsFromLanguage(this.languageId).subscribe(
    //   (d)=>{this.languageTricks = d}
    // )
  }





}
