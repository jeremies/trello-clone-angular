import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board.model';
import { List } from 'src/app/models/list.model';
import { CardsService } from 'src/app/services/cards.service';
import { ListsService } from 'src/app/services/lists.service';
import { LocalBoardService } from 'src/app/services/local-board.service';

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
    private listsService: ListsService,
    private cardsService: CardsService,
    private localBoardService: LocalBoardService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.board = data['board'];

      this.populateLists();
      this.populateCards();
    });
  }

  populateLists() {
    this.listsService
      .getAll(this.board.id)
      .subscribe((lists) => (this.lists = lists));
  }

  populateCards() {
    this.cardsService
      .getAll(this.board.id)
      .subscribe((cards) => this.localBoardService.setCards(cards));
  }
}
