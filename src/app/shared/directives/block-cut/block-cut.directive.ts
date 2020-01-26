import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[BlockCut]'
})
export class BlockCutDirective {

  constructor() { }
  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}
