import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/constants';
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
        this.cards = this.localBoardService.getListCards(this.list.id);
      }
    );

    this.cards = this.localBoardService.getListCards(this.list.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<Card[]>) {
    const newCard: Card = { ...event.item.data };
    if (event.previousContainer === event.container) {
      if (event.currentIndex === event.previousIndex) {
        return;
      }
      if (this.cards.length - 1 === event.currentIndex) {
        newCard.pos =
          this.cards[this.cards.length - 1].pos +
          Constants.incrementPositionCards;
      } else if (event.currentIndex === 0) {
        newCard.pos = this.cards[0].pos / 2;
      } else if (event.currentIndex > event.previousIndex) {
        newCard.pos =
          (this.cards[event.currentIndex].pos +
            this.cards[event.currentIndex + 1].pos) /
          2;
      } else {
        newCard.pos =
          (this.cards[event.currentIndex - 1].pos +
            this.cards[event.currentIndex].pos) /
          2;
      }
    } else {
      newCard.idList = event.container.id;
      if (this.cards.length === 0) {
        newCard.pos = Constants.incrementPositionCards;
      } else if (this.cards.length === event.currentIndex) {
        newCard.pos =
          this.cards[this.cards.length - 1].pos +
          Constants.incrementPositionCards;
      } else if (event.currentIndex === 0) {
        newCard.pos = this.cards[0].pos / 2;
      } else {
        newCard.pos =
          (this.cards[event.currentIndex - 1].pos +
            this.cards[event.currentIndex].pos) /
          2;
      }
    }
    this.localBoardService.updateCard(newCard);
  }
}
