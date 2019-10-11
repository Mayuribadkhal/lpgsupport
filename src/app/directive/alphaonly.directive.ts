import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[saAlphaonly]'
})
export class AlphaonlyDirective {
  constructor(private el:ElementRef) { }
  @HostListener('input',['$event']) OnInputChange(event){
    const initialValue=this.el.nativeElement.value;
    this.el.nativeElement.value=initialValue.replace(/[^A-Za-z ]*/g,"");
    if(this.el.nativeElement.value!==initialValue){     
     return false;
    }
  }
}
