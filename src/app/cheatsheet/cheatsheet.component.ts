import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Lang } from '../interfaces/lang';
import { Problem } from '../interfaces/problem';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cheatsheet',
  templateUrl: './cheatsheet.component.html',
  styleUrls: ['./cheatsheet.component.scss']
})
export class CheatsheetComponent implements OnInit {

  filterOptions?: string;
  // languageTricks : number[] = [1,2,3,4,5,6,7,8,9,1,1,2,2,2,2,2,22,2,2,2,2,2,2,22,2,2,22,2,2,22,2,2,22,2,22,2,22,2,22,2,2,22,2,22]
  // this is a fake data, must be replaced with a real object containing all information about objects (10-20 max at a time)

  languageTricks: Problem[] = []
  languageId: string = "";
  languageName: string = "";
  currentLanguage: Lang | null = null;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
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
        this.languageId = this.activatedRoute.snapshot.params['id'];
        this.languageTricks = response["problems"].data.data;
      }
    );

  }



}
