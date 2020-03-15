import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { HeaderComponent } from './upload-page/header/header.component';
import { UploadPageComponent } from './upload-page/upload-page/upload-page.component';
import { EmailListComponent } from './upload-page/email-list/email-list.component';
import { DestinationComponent } from './destination/destination.component';

const routes: Routes = [
   {
      path: '',
      redirectTo: 'upload-page',
      pathMatch: 'full'
   },
   { path: 'upload-page', component: UploadPageComponent },
   {
      path: 'success-upload',
      component: SuccessPageComponent
   },
   {
      path: 'sign-doc',
      component: DestinationComponent
   }
];

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      SuccessPageComponent,
      HeaderComponent,
      UploadPageComponent,
      EmailListComponent,
      DestinationComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FileUploadModule,
      ReactiveFormsModule,
      PdfViewerModule,
      RouterModule.forRoot(routes)
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
