import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Lang } from '../interfaces/lang';
import { HttpService } from '../services/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  languageForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(50)]),
    img: new FormControl(null, Validators.required)
  })


  languageList: Lang[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  onClickLanguage(lang: Lang):void{
    this.dataService.currentLanguageSubject.next(lang);
    this.router.navigate(['tricks',lang._id]);
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(
      (response: Data)=>{

        this.languageList = response['languages'];
      }
    );
    this.dataService.allLanguagesSubject.subscribe(d=>this.languageList = d);
  }


  onPickedImage(e: Event): void {
    const file: File = ((e.target as HTMLInputElement).files as FileList)[0];
    this.languageForm.patchValue({img: file});
    this.languageForm.get('img')?.updateValueAndValidity({});
    const reader = new FileReader()
    reader.onload = (ev) => {
        console.log(reader.result as string);
    }
    reader.readAsDataURL(file)
  }


  onAddLanguage(){
    // this.httpService.postLanguage({
    //   name: this.languageForm.get('name')?.value,
    //   img: this.languageForm.get('img')?.value
    // }).subscribe((res)=>{
    //   alert("success"); // todo proper handler
    //   this.languageForm.reset();
    //   this.languageForm.clearValidators();
    // })
    this.dataService.postLanguage({
      name: this.languageForm.get('name')?.value,
      img: this.languageForm.get('img')?.value
    }).subscribe((res)=>{
      alert("success"); // todo proper handler
      this.languageForm.reset();
    });

  }



}
