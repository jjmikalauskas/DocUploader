import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() sendSearch = new EventEmitter();
  search: 'Test';

  constructor() { }

  ngOnInit() {
  }

  searchReport() {
    console.log('Searching for ', this.search);
    this.sendSearch.emit(this.search);
  }

}
