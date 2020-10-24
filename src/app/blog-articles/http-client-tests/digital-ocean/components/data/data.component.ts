import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sample-tests-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  constructor(private dataSerivice: DataService) {}

  ngOnInit(): void {
    //  Populate Users
  }
}
