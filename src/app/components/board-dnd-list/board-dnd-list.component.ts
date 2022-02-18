import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { List } from 'src/app/models/list.model';
import { LocalBoardService } from 'src/app/services/local-board.service';

@Component({
  selector: 'app-board-dnd-list',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss'],
})
export class BoardDndListComponent implements OnInit, OnDestroy {
  @Input()
  list!: List;

  cards: Card[] = [];
  subscription!: Subscription;

  constructor(private localBoardService: LocalBoardService) {}

  ngOnInit(): void {
    this.subscription = this.localBoardService.cardsChanged.subscribe(
      (cards: Card[]) => {
        this.cards = cards.filter((card) => card.idList === this.list.id);
      }
    );

    this.cards = this.localBoardService
      .getCards()
      .filter((card) => card.idList === this.list.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
