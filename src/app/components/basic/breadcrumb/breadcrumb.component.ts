import { Component, OnInit } from '@angular/core';
import { GlobaldataService } from '../../../services/globaldata.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  lists:any[];
  search:string;

  constructor(private gd: GlobaldataService) {
    this.lists = gd.lists;
   }

  ngOnInit() {
  }

  addTask(i, task){
    this.gd.lists[i].tasks.push(task);
  }

  deleteTask(i, j){
    this.gd.lists[i].tasks.splice(j, 1);
  }

  editTask(i, j, t){
    this.gd.lists[i].tasks[j] = t;
  }
  search_lists(newValue) {
    this.lists = [];
    this.gd.lists.forEach(element => {
      if(element.name == newValue || element.category == newValue){
        this.lists.push(element);
      }
    });
  }
}
