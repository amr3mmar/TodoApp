import { Component, OnInit } from '@angular/core';
import { GlobaldataService } from '../../services/globaldata.service';
import * as moment from 'moment';

let now = moment().format('LLLL');

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  list_shown: boolean = false;
  name:string;
  due_date:Date;

  constructor(private gd: GlobaldataService) {
    
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

  toggleList(){
    this.list_shown = !this.list_shown;
  }

  createCategory(name){
      this.gd.categories.push(name);
      return false;
  }

  deleteCategory(i){
    this.gd.categories.splice(i, 1);
  }
}
