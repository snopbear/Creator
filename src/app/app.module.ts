import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  RouterModule,
  Routes,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DndModule } from "ngx-drag-drop";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";

import { EditAppComponent } from "./edit-app/edit-app.component";
import { BasicComponent } from "./basic/basic.component";
import { ReadFromJsonComponent } from "./read-from-json/read-from-json.component";
import { HttpClientModule } from "@angular/common/http";

import { TabsModule } from "ngx-bootstrap/tabs";
import { AccordionModule } from "ngx-bootstrap/accordion";
import {
  BsDatepickerModule,
  BsDatepickerConfig
} from "ngx-bootstrap/datepicker";
import { CategoryFilterPipe } from "./shared/pipe/category-filter.pipe";
import { MaterialModule } from "./shared/material/material.module";
import { SharedModule } from "./shared/shared.module";
import { MAT_DATE_LOCALE } from "@angular/material";
import {OwlRadioModule} from 'owl-ng';
import {GestureConfig} from 'owl-ng'
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import 'hammerjs';
export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    //   containerClass: 'theme-dark-blue',
    dateInputFormat: "DD/MM/YYYY",
    isAnimated: true
  });
}

const appRoutes: Routes = [{ path: "", component: EditAppComponent }];

@NgModule({
  declarations: [
    AppComponent,
    EditAppComponent,
    BasicComponent,
    ReadFromJsonComponent,
    CategoryFilterPipe
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    SweetAlert2Module.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DndModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    OwlRadioModule,
    NgxJsonViewerModule,
    
  ],
  providers: [
   {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig }
  ], schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {}
