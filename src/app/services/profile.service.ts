import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, switchMap, take } from 'rxjs';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { UserConstructor } from '../utils/userConstructor';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { SnackService } from './snack.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private router: Router,
    private dataService: DataService,
    private snackService: SnackService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  uploadProfilePhoto(){}


  openDialog(user:UserConstructor){
    const dialog_ = this.dialog.open(ProfileDialogComponent, {  width: '550px' , data:user });

    dialog_.afterClosed().subscribe(
      (result: number|{username?:string,photo?:string}|undefined)=>{

        if(!result) return;

        if (typeof(result) === 'number'){

          this.authService.logout();
          this.router.navigate(['index'])

        }else{

            if(user.username === result.username){ delete result.username }
            if(user.photo === result.photo){ delete result.photo }

            if(Object.keys(result).length === 0){
              this.snackService.warnSnack('nothing changed. Your profile was not updated',1500);
              return;
            }

            this.authService.updateProfile(result)
              .pipe(take(1))
              .subscribe(
                (u)=>{this.snackService.successSnack('profile successfully updated',1500,'bottom')}
              )
        }
      }
    );
  }
}
