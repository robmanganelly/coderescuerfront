import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Lang } from '../interfaces/lang';
import { HttpService } from '../services/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { UIFileReaderService } from '../services/uifile-reader.service';
import { SnackService } from '../services/snack.service';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit, OnDestroy {

  globalUnSubscriber = new Subject<boolean>();

  displayBanner = true; // loginBanner //todo rename this binding: isLogged (modify the logic)

  languageForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(50)]),
    img: new FormControl(null, Validators.required)
  })


  languageList: Lang[] = [];

  constructor(
    private authService: AuthService,
    private snackBarService: SnackService,
    private UIFileReader: UIFileReaderService,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.globalUnSubscriber.next(true);
    this.globalUnSubscriber.complete();
  }

  onClickLanguage(lang: Lang):void{
    this.dataService.currentLanguageSubject.next(lang);
    this.router.navigate(['tricks',lang._id]);
  }

  ngOnInit(): void {

    this.authService.autologin()

    this.activatedRoute.data.subscribe(
      (response: Data)=>{

        this.languageList = response['languages'];
      }
    );
    this.dataService.allLanguagesSubject
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(d=>this.languageList = d);

    this.dataService.userBehaviorSubject
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe(
      (user)=>{
        this.displayBanner = !user;
      }
    )

  }


  onPickedImage(e: Event): void {
    return this.UIFileReader.loadImage(e,this.languageForm,"img")
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
    })
    .pipe(takeUntil(this.globalUnSubscriber))
    .subscribe((res)=>{
      this.snackBarService.successSnack("language added successfully");
      this.languageForm.reset();
    });

  }



}


