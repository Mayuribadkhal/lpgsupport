import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[saAlphanumericonly]'
})
export class AlphanumericonlyDirective {

  constructor(private el:ElementRef) { }
  @HostListener('input',['$event']) OnInputChange(event){
  const initialValue=this.el.nativeElement.value;
  this.el.nativeElement.value=initialValue.replace(/[^A-Za-z0-9.]*/g,"");
  if(this.el.nativeElement.value!==initialValue){
   // event.stopPropogation();
   return false;
  }
  }


}
