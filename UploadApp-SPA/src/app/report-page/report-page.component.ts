import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { DocDataService } from '../_services/docData.service';
import { DocInfo } from '../models/docinfo';
import { PaginationResult, Pagination } from '../models/Pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {
  data: DocInfo[];
  // settings = {
  //   actions: false,
  //   columns: {
  //     firstName: {
  //       title: 'FirstName'
  //     },
  //     lastName: {
  //       title: 'LastName'
  //     },
  //     company: {
  //       title: 'Company'
  //     },
  //     status: {
  //       title: 'Status'
  //     }
  //   }
  // };
  // pageNumber = 1;
  // pageSize = 5;
  pagination: Pagination;

  constructor(private http: HttpClient,
              private alertify: AlertifyService,
              private docService: DocDataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getReportData();
  }

  getReportData() {
    // this.docService.getReportInfo(this.pageNumber, this.pageSize).subscribe(
    //   (response: PaginationResult<DocInfo[]>) => {
    //     // debugger;
    //     console.log('Get report data call successful>');
    //     console.log(response);
    //     this.data = response.result;
    //     this.pagination = response.pagination;
    //   },
    //   error => {
    //     console.log('Error during getReportData GET op', error);
    //   }
    // );
    this.route.data.subscribe(response => {
      // debugger;
      this.data = response.docs.result;
      this.pagination = response.docs.pagination;
      console.log('Results=', response.docs.result);
    });
  }

  pageChanged(e: any): void {
    this.pagination.currentPage = e.page;
    // console.log(this.pagination.currentPage);
    this.loadNewPage();
  }

  loadNewPage() {
    this.docService.getReportInfo(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (response: PaginationResult<DocInfo[]>) => {
        this.data = response.result;
        this.pagination = response.pagination;
      },
      error => {
        console.log('Error during loadNewPage() getReportData GET op', error);
      }
    );
  }

  newSearch(filter: string) {
    console.log('Received new search', filter);
    this.docService.getReportInfo(this.pagination.currentPage, this.pagination.itemsPerPage, filter).subscribe(
      (response: PaginationResult<DocInfo[]>) => {
        // debugger;
        console.log(response);
        this.data = response.result;
        this.pagination = response.pagination;
      },
      error => {
        console.log('Error during loadNewPage() getReportData GET op', error);
      }
    );
  }

  resendLink(id: number) {
    console.log('Resending link for #', id);
    const msg = 'Please confim that you want to resend the link';
    this.alertify.confirm(msg, () => {
      console.log('Calling post to resend link #', id);
      this.docService.resendLink(id).subscribe(
        resp => {
          this.alertify.success('Resent email link');
        },
        error => {
          this.alertify.error('Error during resend link: ' + error);
        }
      );
    });
   }

}
