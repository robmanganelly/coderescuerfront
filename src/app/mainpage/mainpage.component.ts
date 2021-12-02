import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Lang } from '../interfaces/lang';
import { HttpService } from '../services/http.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private activatedRoute: ActivatedRoute
  ) { }

  onClickLanguage(lang: Lang):void{
    // todo request data from server before navigating
    this.router.navigate(['tricks']);
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(

      (response: Data)=>{
        response['languages'].data.data.forEach((lan: Lang) => {
          lan.img = `${environment.apiUrl}/${lan.img}`
        });

        console.log(response['languages'].data.data); // todo remove after testing

        this.languageList = response['languages'].data.data;
       }
      );
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
    this.httpService.postLanguage({
      name: this.languageForm.get('name')?.value,
      img: this.languageForm.get('img')?.value
    }).subscribe((res)=>{
      alert("success"); // todo proper handler
      this.languageForm.reset();
      this.languageForm.clearValidators();
    })

    //after perform all logic

  }



}
