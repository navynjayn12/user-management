import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-usercomponent',
  templateUrl: './usercomponent.component.html',
  styleUrls: ['./usercomponent.component.css']
})
export class UsercomponentComponent implements OnInit {
  sortDetail: {
    userName: any,
    projectName: any,
    categoryName: any
  } = {
    userName: false,
    projectName: false,
    categoryName: false
    };

  userfilerkey: { skip: any, take: any, status: boolean, sortBy: string, order: string } = {
    skip: 0,
    take: 2,
    status: false,
    sortBy: '',
    order: ''
  };

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  userList: any = []
  userTotal: number = 0
  constructor(
    private service: CommonService
  ) { }

  ngOnInit(): void {
    this.onGetUsersList();
  }

  onGetUsersList() {
    this.service.getUsers(this.userfilerkey).subscribe((res: any) => {
      this.userList = res.data
      this.userTotal = res.total
    }, err => {
      alert(err)
    })
  }

  sortData(event) {
    this.sortDetail[event.active] = !this.sortDetail[event.active];
    for (const param in this.sortDetail) {
      if (param !== event.active) {
        this.sortDetail[param] = false;
      }
    }
    this.userfilerkey.sortBy = event.active;
    this.userfilerkey.order = (this.sortDetail[event.active] ? 'ASC' : 'DESC');
    this.onGetUsersList();
  }

  pagination(param) {
    const offset = (param.pageIndex === 0) ? 0 : param.pageIndex * param.pageSize;
    const limit = param.pageSize;
    this.userfilerkey.skip = offset;
    this.userfilerkey.take = limit;
    this.onGetUsersList();
  }

}
