import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { DocInfo } from '../models/docinfo';
import { DocDataService } from '../_services/docData.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  baseUrl = environment.apiUrl;
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  public isCollapsed = false;
  doc1: DocInfo;
  emailLink = '';
  firstname: string;
  lastname = '';
  documentName: string;

  constructor(
    private http: HttpClient,
    private docService: DocDataService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: AlertifyService
  ) {}

  ngOnInit() {
    this.emailLink = this.route.snapshot.params.emaillink;
    console.log('emaillink=' + this.emailLink.trim());
    // this.route.queryParams.subscribe(params => {
    //   console.log(params.emaillink);
    // });
    console.log('resolver data=');
    // this.route.data.subscribe(
    //   (data: { doc: DocInfo }) => {
    //     console.log(data);
    //     this.doc1 = data.doc;
    //     this.lastname = data.doc.lastname;
    //     this.firstname = 'Test1';
    //   });
    this.getDocumentInfo(this.emailLink);
    // this.route.data.subscribe(data => this.doc1 = data);
    // debugger;
  }

  getDocumentInfo(emaillink: string) {
    const url = this.baseUrl + 'licensing/' + emaillink;
    console.log(url);
    this.docService.getDocumentInfo(emaillink).subscribe(
      (response: DocInfo) => {
        // debugger;
        console.log('Get data call successful');
        console.log(response);
        this.doc1 = response;
        this.firstname = response["firstName"];
        this.lastname = response["lastName"];
      },
      error => {
        console.log('Error during getDocumentInfo GET op', error);
      }
    );
  }

  confirm() {
    console.log('confirmation email has been sent to requestor');
  }
}
