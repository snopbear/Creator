import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[English]'
})
export class EnglishDirective {
  // tslint:disable-next-line:member-ordering
  @Input() OnlyEnglish: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {

    const englishAlphabetAndWhiteSpace = /[A-Za-z ]/g;

    // tslint:disable-next-line:prefer-const
    let e = event as KeyboardEvent;

    if (this.OnlyEnglish) {
      if (e.keyCode === 8 || e.keyCode === 9 ||
        e.keyCode === 16 || e.keyCode === 32 || e.keyCode === 37 ||
        e.keyCode === 39 || englishAlphabetAndWhiteSpace.test(event.key)) {
        return; // let it happen, don't do anything
      } else {
        e.preventDefault();
      } // Ensure that it is a number and stop the keypress
    }
  }

}
