import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  values: any;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
    this.initializeUploader();
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
        documents: [ 'test' ],
        recipientlist: [ 'recipient1', 'recipient2' ],
        sendername: 'john',
        senderemail: 'johnmik35@hotmail.com'
      };
     console.log('docInfo=' + docInfo.recipientlist);
     this.http.post(this.baseUrl + 'send', docInfo).subscribe(response => {
      console.log('Returned from Post', response);
     });
  }

}
