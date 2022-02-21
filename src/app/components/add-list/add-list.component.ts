import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
})
export class AddListComponent implements OnInit {
  showListInput: boolean = false;
  listName: string = '';

  constructor() {}

  ngOnInit(): void {}

  openListInput() {
    this.showListInput = true;
  }

  addList() {}

  closeListInput() {
    this.showListInput = false;
  }
}
