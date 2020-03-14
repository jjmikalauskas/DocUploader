import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { FileUploadModule } from 'ng2-file-upload';
// import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent
      // FileSelectDirective
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FileUploadModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
