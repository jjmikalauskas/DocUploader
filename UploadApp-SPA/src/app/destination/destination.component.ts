import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  public isCollapsed = false;
  constructor() { }

  ngOnInit() {
  }
 confirm(){
   console.log("confirmation email has been sent to requestor")
 }
}
