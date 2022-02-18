import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board.model';
import { List } from 'src/app/models/list.model';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board!: Board;
  lists: List[] = [];

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.board = data['board'];

      this.populateLists();
    });
  }

  populateLists() {
    this.listsService
      .getAll(this.board.id)
      .subscribe((lists) => (this.lists = lists));
  }
}
