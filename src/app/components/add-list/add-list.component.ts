import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants';
import { LocalListsService } from 'src/app/services/local-lists.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
})
export class AddListComponent implements OnInit {
  @Input() idBoard: string = '';
  showListInput: boolean = false;
  listName: string = '';

  constructor(private localListsService: LocalListsService) {}

  ngOnInit(): void {}

  openListInput() {
    this.showListInput = true;
  }

  addList() {
    const currentLists = this.localListsService.getLists();
    const pos =
      currentLists[currentLists.length - 1].pos +
      Constants.incrementPositionCards;
    this.localListsService.addList({
      id: Constants.idNew,
      idBoard: this.idBoard,
      name: this.listName,
      pos,
    });
    this.listName = '';
  }

  closeListInput() {
    this.showListInput = false;
  }
}
