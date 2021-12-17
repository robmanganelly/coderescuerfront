import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExtensionTest } from '../utils/extensions';
import { SnackService } from './snack.service';

@Injectable({
  providedIn: 'root'
})
export class UIFileReaderService {

  constructor(private snackService: SnackService) { }


  readContent(e:Event, form: FormGroup, controlName: string){
    const File: File = ((e.target as HTMLInputElement).files as FileList)[0];
    const reader = new FileReader();

    reader.onload = (ev)=>{//define reader behavior

    if(!ExtensionTest.isValidExtension(File.name)){
     return this.snackService.warnSnack(`unsupported extension <${ExtensionTest.findExtension(File.name)}> for a text file`) // create proper handler (snackbar)
    }

    // this.personalSolutionValue = reader.result as string;
    form.get(controlName)?.setValue(reader.result as string)
    }

    reader.readAsText(File);
   }

   loadImage(e: Event,form:FormGroup, controlName: string){
    const file: File = ((e.target as HTMLInputElement).files as FileList)[0];
    form.patchValue({img: file});
    form.get(controlName)?.updateValueAndValidity({});
    const reader = new FileReader()
    reader.onload = (ev) => {
        console.log(reader.result as string);
    }
    reader.readAsDataURL(file)
   }
}
