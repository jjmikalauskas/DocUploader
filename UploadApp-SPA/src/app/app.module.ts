import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';

import { UploadPageComponent } from './upload-page/upload-page.component';
import { HeaderComponent } from './header/header.component';
import { SuccessPageComponent } from './success-page/success-page.component';
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
      UploadPageComponent,
      HeaderComponent,
      SuccessPageComponent,
      DestinationComponent,
      SuccessPageComponent,
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
