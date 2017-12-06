import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Todo items',
    main: [
      {
        state: 'dashboard',
        name: 'New todo list',
        type: 'link',
        icon: 'fa fa-plus'
      },
      {
        state: 'lists',
        name: 'View, Edit Lists',
        type: 'link',
        icon: 'fa fa-list'
      },
      {
        state: 'categories',
        name: 'Add & View Categories',
        type: 'link',
        icon: 'ti-layers'
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
