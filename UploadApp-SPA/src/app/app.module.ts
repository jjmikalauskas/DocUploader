import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';

import { UploadPageComponent } from './upload-page/upload-page.component';
import { HeaderComponent } from './header/header.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { DestinationComponent } from './destination/destination.component';
import { DocumentResolverService } from './_services/documentResolver.service';
import { DocDataService } from './_services/docData.service';
import { AlertifyService } from './_services/alertify.service';
import { SentEmailService } from './_services/sentEmail.service';

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
      path: 'sign-doc/:emaillink',
      component: DestinationComponent,
      resolve: { DocInfo: DocumentResolverService }
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
      FormsModule,
      HttpClientModule,
      FileUploadModule,
      ReactiveFormsModule,
      PdfViewerModule,
      RouterModule.forRoot(routes)
   ],
   providers: [
      AlertifyService,
      DocDataService,
      DocumentResolverService,
      SentEmailService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
