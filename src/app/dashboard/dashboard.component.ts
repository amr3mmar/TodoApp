import {Component, OnInit} from '@angular/core';
import { GlobaldataService } from '../services/globaldata.service';
declare const $: any;
declare var Morris: any;
import * as moment from 'moment';

let now = moment().format('LLLL');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  list_shown: boolean = false;
  name:string;
  due_date:Date;

  constructor(private gd: GlobaldataService) {
    
   }

  ngOnInit() {
    this.gd.lists.forEach(element => {
      var y = moment();
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

  toggleList(){
    this.list_shown = !this.list_shown;
  }

  createList(name, due_date, due_time, category){
    var tasks =[];
    var notify = false;
      this.gd.lists.push({
        name,
        due_date,
        due_time,
        tasks,
        category,
        notify
      });
      return false;
  }

  deleteList(i){
    this.gd.lists.splice(i, 1);
  }

}


