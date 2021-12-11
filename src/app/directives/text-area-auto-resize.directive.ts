import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextAreaAutoResize]'
})
export class TextAreaAutoResizeDirective {

  constructor(private elementRef: ElementRef) { }


  resize(){
    this.elementRef.nativeElement.style.height = "auto";
     this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
  }
  @HostListener(':input') onInput(){
    this.resize();
  }

  ngOnInit() {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

}
