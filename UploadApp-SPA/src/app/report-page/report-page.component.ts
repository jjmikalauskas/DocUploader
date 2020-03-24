import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { DocDataService } from '../_services/docData.service';
import { DocInfo } from '../models/docinfo';
import { PaginationResult, Pagination } from '../models/Pagination';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {

  constructor(private http: HttpClient,
              private alertify: AlertifyService,
              private spinner: NgxSpinnerService,
              private docService: DocDataService,
              private route: ActivatedRoute) { }
  // data: DocInfo[];
  pagination: Pagination;
  searchFilter = '';

  data2 = new Array();

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 333);
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
      // this.data = response.docs.result;
      this.pagination = response.docs.pagination;
      console.log('Results=', response.docs.result);
      // debugger;
      this.addLastActionDate(response.docs.result);
    });
  }

  addLastActionDate(result) {
    this.data2 = new Array();
    result.map(doc => {
      doc.lastActionDate = doc.dateSent;
      if (doc.status === 'Viewed') {
        doc.lastActionDate = doc.dateViewed;
      } else if (doc.status === 'Agreed') {
        doc.lastActionDate = doc.dateAgreed;
      } else if (doc.status === 'Resent') {
        doc.lastActionDate = doc.dateResent;
      }
      this.data2.push(doc);
    });
  }

  pageChanged(e: any): void {
    this.pagination.currentPage = e.page;
    // console.log(this.pagination.currentPage);
    this.loadNewPage();
  }

  loadNewPage() {
    this.docService.getReportInfo(this.pagination.currentPage, this.pagination.itemsPerPage, this.searchFilter).subscribe(
      (response: PaginationResult<DocInfo[]>) => {
        // this.data = response.result;
        this.addLastActionDate(response.result);
        this.pagination = response.pagination;
      },
      error => {
        console.log('Error during loadNewPage() getReportData GET op', error);
      }
    );
  }

  addFilter(newFilter: string) {
    if (newFilter === '') {
      return '';
    }
    if (this.searchFilter === 'Sent' || this.searchFilter === 'Resent' ||
        this.searchFilter === 'Viewed' || this.searchFilter === 'Agreed') {
      return this.searchFilter + '+' + newFilter;
    }
    return newFilter;
  }

  newSearch(filter: string) {
    this.spinner.show();
    this.searchFilter = this.addFilter(filter);
    console.log('Received new search', this.searchFilter);
    this.docService.getReportInfo(this.pagination.currentPage, this.pagination.itemsPerPage, this.searchFilter).subscribe(
      (response: PaginationResult<DocInfo[]>) => {
        // debugger;
        console.log(response.result);
        // this.data2 = response.result;
        this.addLastActionDate(response.result);
        this.pagination = response.pagination;
      },
      error => {
        console.log('Error during newSearch() getReportInfo GET op', error);
      }
    );
    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  // newFilter(filter: string) {
  //   this.spinner.show();
  //   this.searchFilter = filter;
  //   console.log('Received new filter action', filter);
  //   this.docService.getReportInfo(this.pagination.currentPage, this.pagination.itemsPerPage, filter).subscribe(
  //     (response: PaginationResult<DocInfo[]>) => {
  //       // debugger;
  //       // console.log(response);
  //       // this.data2 = response.result;
  //       this.addLastActionDate(response.result);
  //       this.pagination = response.pagination;
  //     },
  //     error => {
  //       console.log('Error during loadNewPage() getReportData GET op', error);
  //     }
  //   );
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 1500);
  // }

  resendLink(id: number) {
    console.log('Resending link for #', id);
    const msg = 'Please confim that you want to resend the link';
    this.alertify.confirm(msg, () => {
      console.log('Calling post to resend link #', id);
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
      this.docService.resendLink(id).subscribe(
        resp => {
          this.alertify.success('Resent email link');
          this.newSearch(this.searchFilter);
        },
        error => {
          this.alertify.error('Error during resend link: ' + error);
        }
      );
    });
   }

}
