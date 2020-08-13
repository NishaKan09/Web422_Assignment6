import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page: number;
    @Output() newPage = new EventEmitter();

  constructor() { }

  prevPageBtn(page){
    if (page > 1){
      this.newPage.emit(page-1);
      window.scrollTo(0,0);
    }
  }

  nxtPageBtn(page){
    this.newPage.emit(page+1);
    window.scrollTo(0,0);
  }

  ngOnInit() {
  }

}
