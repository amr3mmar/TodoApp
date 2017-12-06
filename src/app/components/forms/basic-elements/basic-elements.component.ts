import { Component, OnInit } from '@angular/core';
import { GlobaldataService } from '../../../services/globaldata.service';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.css']
})
export class BasicElementsComponent implements OnInit {

  list_shown: boolean = false;
  name:string;
  due_date:Date;

  constructor(private gd: GlobaldataService) {
    
   }

  ngOnInit() {
    
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
