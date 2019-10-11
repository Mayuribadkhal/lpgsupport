import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[saNumericDotOnly]'
})
export class NumericDotOnlyDirective {

  constructor(private el:ElementRef) { }
  @HostListener('input',['$event']) OnInputChange(event){
    const initialValue=this.el.nativeElement.value;
    this.el.nativeElement.value=initialValue.replace(/[^0-9.]*/g,"");
    if(this.el.nativeElement.value!==initialValue){
     // event.stopPropogation();
     return false;
    }
  }

}
