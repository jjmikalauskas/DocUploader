import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileUploadModule } from 'ng2-file-upload';
// import { FileSelectDirective } from 'ng2-file-upload';
import { UploaderComponent } from './uploader/uploader.component';

@NgModule({
   declarations: [
      AppComponent,
      UploaderComponent
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
