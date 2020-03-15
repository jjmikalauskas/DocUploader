import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  values: any;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiUrl;
  dntLinkUrl='';
  userEmails = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]
    ),
  });

  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getValues();
    this.initializeUploader();
    this.dntLinkUrl = this.route.snapshot.params['temporaryUrl'];
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + '/photos', // 'users/' + this.authService.decodedToken.nameid + '/photos',
      // authToken: 'Bearer' + localStorage.getItem('token'),
      isHTML5: true,
      // allowedFileType: ['image'],
      // removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
      , headers: [
        //   { name: 'Content-Type', value: 'application/x-www-form-urlencoded' },
        { name: 'Access-Control-Allow-Origin', value: 'http://localhost:4200' }
      ]
    });
  }

  // this.uploader.onBeforeUploadItem = (item) => { item.withCredentials = false; };

  // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }

  sendDocInfo() {
    let docInfo = {
      documents: ['test'],
      recipientlist: ['recipient1', 'recipient2'],
      sendername: 'john',
      senderemail: 'johnmik35@hotmail.com'
    };
    console.log('docInfo=' + docInfo.recipientlist);
    this.http.post(this.baseUrl + 'send', docInfo).subscribe(response => {
      console.log('Returned from Post', response);
    });
    // this.router.navigate(['/success-upload',this.dntLinkUrl]);
    this.router.navigate(['/success-upload'])
  }
}
