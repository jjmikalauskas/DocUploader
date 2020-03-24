import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() sendSearch = new EventEmitter();
  search: string = 'Test';
  sent = false;
  resent = false;
  viewed = false;
  agreed = false;

  constructor() { }

  ngOnInit() {
  }

  searchReport() {
    console.log('Searching for ', this.search);
    this.sendSearch.emit(this.search);
  }

  onCheckboxChange(value: string, ischecked: boolean) {
    console.log('radio button', value, ' is checked=', ischecked);
    // this.sendFilter.emit(value);
    this.sendSearch.emit(value);
  }

  clearFilters() {
    this.search = '';
    this.sent = false;
    this.resent = false;
    this.viewed = false;
    this.agreed = false;
    this.sendSearch.emit('');
  }

}
