import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NumberDirective } from "./number/number.directive";
import { EnglishDirective } from "./english/english.directive";
import { EnglishWithoutSpaceDirective } from "./english-without-space/english-without-space.directive";


@NgModule({
   declarations: [
      NumberDirective,
      EnglishDirective,
      EnglishWithoutSpaceDirective
   ],
   exports: [
      NumberDirective,
      EnglishDirective,
      EnglishWithoutSpaceDirective
   ]
})
export class DirectivesModule {}
