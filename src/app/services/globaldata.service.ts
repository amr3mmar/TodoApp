import { Injectable } from '@angular/core';

interface ShareObj {
  [id: string]: any;
}

interface List{
  name:string,
  due_date:Date,
  due_time:string,
  tasks:string[],
  category:string,
  notify:boolean
}

interface Notification{
  message:string,
  time:string
}

@Injectable()
export class GlobaldataService {
  lists:List[]=[];
  categories:string[]=[];
  notifications:string[]=[];
  notification_count:number=0;
}
