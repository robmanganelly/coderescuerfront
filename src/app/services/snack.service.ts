
import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(
      private snack: MatSnackBar
  ) { }

  primarySnack(
      msg: string,
      duration: number = 4000,
      vpos: any = 'top',
      hpos:any  = 'right'
  ){
    this.snack.open(msg,undefined,{
      panelClass: ['primaryColorBG'],
      duration: duration,
      verticalPosition:vpos,
      horizontalPosition: hpos,
      politeness: "polite"
    })
  }

  successSnack(
    msg: string,
    duration: number = 4000,
    vpos: any = 'bottom',
    hpos:any  = 'right'
){

    this.snack.open(msg,undefined,{
      panelClass: ['accentColorBG'],
      duration: duration,
      verticalPosition:vpos,
      horizontalPosition: hpos,
      politeness: "polite"
    })


}

  warnSnack(
      msg: string,
      duration: number = 4000,
      vpos: any = 'bottom',
      hpos:any  = 'right'
  ){

      this.snack.open(msg,undefined,{
        panelClass: ['warnColorBG'],
        duration: duration,
        verticalPosition:vpos,
        horizontalPosition: hpos,
        politeness: "polite"
      })


  }

  execute(message:string,label:string,config:MatSnackBarConfig,perform:(v: void)=>void){
    this.snack.open(message,label,config).onAction().subscribe(perform)
  }
}
