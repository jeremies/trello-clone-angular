import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { List } from '../models/list.model';
import { ListsService } from './lists.service';

@Injectable({
  providedIn: 'root',
})
export class LocalListsService {
  listsChanged = new Subject<List[]>();

  private lists: List[] = [];

  constructor(private listsService: ListsService) {}

  setLists(lists: List[]) {
    this.lists = lists;
    this.listsChanged.next(this.lists.slice());
  }

  getLists() {
    return this.lists
      .slice()
      .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0));
  }

  updateList(newList: List) {
    const index = this.lists.findIndex((list) => list.id === newList.id);
    this.lists[index] = { ...newList };
    this.listsChanged.next(this.lists.slice());
    this.listsService.update(newList).subscribe();
  }
}
