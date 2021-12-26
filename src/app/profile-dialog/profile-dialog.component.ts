import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from '../services/snack.service';
import { StaticPathGeneratorService } from '../services/static-path-generator.service';
import { UIFileReaderService } from '../services/uifile-reader.service';
import { StaticPath } from '../utils/static-path';
import { UserConstructor } from '../utils/userConstructor';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  updateForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    photo: new FormControl('')
  });

  constructor(
    public staticAsService: StaticPathGeneratorService,
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:UserConstructor,
    private snackService: SnackService,
    private UIFileReader:UIFileReaderService

    ) {  }



  ngOnInit(): void {
    this.updateForm.get('photo')?.setValue(StaticPath.generatePath(this.data.photo));
    this.updateForm.get('username')?.setValue(this.data.username);
  }

  onCloseDialogClicked(){
    this.snackService.primarySnack('all unsaved changes were discarded', 2000,'bottom')
    this.dialogRef.close();
  }

  onPickImg(e: Event): void {
    return this.UIFileReader.loadImage(e,this.updateForm,"photo")
  }

  getCurrentImageName():string{
    return this.staticAsService.generatePath(this.updateForm.get('photo')?.value);
  }

}
