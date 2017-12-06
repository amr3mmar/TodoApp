import { Component, OnInit } from '@angular/core';
import { GlobaldataService } from '../../services/globaldata.service';
import * as moment from 'moment';

let now = moment().format('LLLL');

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists:any[];
  search:string;

  constructor(private gd: GlobaldataService) {
    this.lists = gd.lists;
   }

  ngOnInit() {
    this.gd.lists.forEach(element => {
      var y = new Date();
      var yy = y.toISOString();
      var x = moment(yy).isAfter(element.due_date, 'day');
      if(x && !element.notify){
        element.notify = true;
        this.gd.notifications.unshift('Due date for '+element.name+' has passed!');
        this.gd.notification_count++;
      }
      if(moment(yy).isSame(element.due_date, 'day') && !element.notify){
        var currentTime = moment(moment(), 'h:mma');
        var dueTime = moment(element.due_time, 'h:mma');
        if(currentTime.isAfter(dueTime)){
          element.notify = true;
          this.gd.notifications.unshift('Due date for '+element.name+' has passed!');
          this.gd.notification_count++;
        }
      }
    });
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

