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
    const file: File = ((e.target as HTMLInputElement).files as FileList)[0];
    const reader = new FileReader();

    reader.onload = (ev)=>{//define reader behavior

    if(!ExtensionTest.isValidTextExtension(file.name)){
     return this.snackService.warnSnack(`unsupported extension <${ExtensionTest.findExtension(file.name)}> for a text file`)
    }

    // this.personalSolutionValue = reader.result as string;
    form.get(controlName)?.setValue(reader.result as string)
    }

    reader.readAsText(file);
   }

   loadImage(e: Event,form:FormGroup, controlName: string){
    const file: File = ((e.target as HTMLInputElement).files as FileList)[0];
    form.patchValue({img: file});
    form.get(controlName)?.updateValueAndValidity({});
    const reader = new FileReader()
    reader.onload = (ev) => {
        if(!ExtensionTest.isValidImageExtension(file.name)){
          return this.snackService.warnSnack(`unsupported extension <${ExtensionTest.findExtension(file.name)}> for an image file`)
        }
    }
    reader.readAsDataURL(file)
   }
}
