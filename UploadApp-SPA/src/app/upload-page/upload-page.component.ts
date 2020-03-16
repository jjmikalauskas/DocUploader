import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  values: any;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  droppedFiles: string[];
  baseUrl = environment.apiUrl;
  dntLinkUrl = '';
  userEmails = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]
    ),
  });

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private notify: AlertifyService) { }

  ngOnInit() {
    this.getValues();
    this.initializeUploader();
    this.dntLinkUrl = this.route.snapshot.params.temporaryUrl;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onFileDrop(e: any): void {
    console.log('Dropped=' + e);
    this.droppedFiles = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'docs', // 'users/' + this.authService.decodedToken.nameid + '/photos',
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
      // documents: [],
      documentfullname: '',
      firstname: this.userEmails.get('firstname').value,
      lastname: this.userEmails.get('lastname').value,
      emailaddress: this.userEmails.get('email').value,
      company: 'Test hospital',
      salesforceid: '101'
    };
    let files = [];
    let docs = '';
    console.log('uploader=');
    this.uploader.queue.forEach(f => { console.log(f.file.name); files.push(f.file.name); docs = docs + f.file.name + ';'; });
    //docInfo.documents = files;
    docInfo.documentfullname = docs;
    this.http.post(this.baseUrl + 'sendlink', docInfo).subscribe(
      (response) => {
        this.notify.success('Document and email information saved');
        console.log('Post call successful');
        this.router.navigate(['/success-upload']);
    },
    error => {
      console.log('Error during sendLink POST op', error);
    });
  }
}
