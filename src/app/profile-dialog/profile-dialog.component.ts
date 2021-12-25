import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from '../services/snack.service';
import { StaticPath } from '../utils/static-path';
import { UserConstructor } from '../utils/userConstructor';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:UserConstructor,
    private snackService: SnackService
  ) {  }

  username:string = "";
  photo: string = "";

  ngOnInit(): void {
    this.photo = StaticPath.generatePath(this.data.photo);
    this.username = this.data.username;
  }

  onCloseDialogClicked(){
    this.snackService.primarySnack('all unsaved changes were discarded', 2000,'bottom')
    this.dialogRef.close();
  }

}
