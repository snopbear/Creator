import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from './directives/directives.module';


@NgModule({
  imports: [
    CommonModule,
    DirectivesModule
  ],
  declarations: [],
  exports: [DirectivesModule]
})
export class SharedModule {}
