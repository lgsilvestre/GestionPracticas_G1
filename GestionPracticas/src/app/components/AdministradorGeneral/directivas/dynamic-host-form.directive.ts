import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDynamicHostForm]'
})
export class DynamicHostFormDirective {

  constructor(public viewContainerRef: ViewContainerRef)
  { }
}
