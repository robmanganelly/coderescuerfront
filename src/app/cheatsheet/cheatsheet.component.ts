import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Generic } from '../interfaces/generic';
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
    noFilter:{page:0, limit:10, withMeta: true},
    newFilter:{isnew:true, page:0, limit:10, withMeta: true},
    favFilter:{favorites:true, page:0, limit:10, withMeta: true},
    add:{return: true}
  }

  @ViewChild('paginatorProblems')paginator: MatPaginator| null = null;

  noFilter = 'noFilter';

  languageTricks: Problem[] = []
  languageId: string = "";
  languageName: string = "";
  currentLanguage: Lang | null = null;

  limitPerPage = 10;
  totalItems = 100;
  previousPageIndex = 0

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
  ) {}

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
        this.languageId = this.activatedRoute.snapshot.params['id'];
        this.languageTricks = response["problems"]["data"];
        this.totalItems = response["problems"]["meta"]["total"] as number;
        this.trimArray(this.totalItems);
      }
    );
    this.dataService.problemsOnSelectedLanguageSubject.subscribe(
      problems=>{
        this.languageTricks = problems;

      }
    )
    if(!this.languageId || !this.currentLanguage ){ this.router.navigate([''])}
  };

  capturePageEvent(event: PageEvent, filterValue:string,searchValue?:string){
    console.log(event)
    console.log(filterValue)
    this.filterOptions[filterValue]['page'] = event.pageIndex;
    this.filterOptions[filterValue]['limit'] = event.pageSize;
    return this.refreshProblems(filterValue,false,searchValue);

  }

  refreshProblems(value: string,reset:boolean=true,search?:string): void{

    if(!!this.filterOptions[value]['return']){return;}


    if(reset){
      this.paginator?.firstPage()
    }
    this.dataService.getProblemsFromLanguage(this.languageId,(!!search && search!=="")?{...this.filterOptions[value], search }:this.filterOptions[value]).subscribe(
      (p)=>{
        this.languageTricks = (p as {data: Problem[]}).data
        this.totalItems = (p as {meta: Generic}).meta['total'] as number;
        this.trimArray(this.totalItems);
        }
    );
    // this.dataService.getProblemsFromLanguage(this.languageId).subscribe(
    //   (d)=>{this.languageTricks = d}
    // )
  }


  private trimArray(topValue=50):void{
    this.pagSOpt = Array.from(function*(){
      let i=1;
      while (i <=topValue){
        if(i%5 === 0 ){yield i;}
        i++;
      }
    }());
  }

  searchByName(input:HTMLInputElement){
    if(input.value === "") return;
    this.noFilter = 'noFilter'
    this.refreshProblems(this.noFilter,true,input.value);
  }

}
