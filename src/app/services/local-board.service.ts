import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Board } from '../models/board.model';
import { Card } from '../models/card.model';
import { List } from '../models/list.model';
import { CardsService } from './cards.service';

@Injectable({
  providedIn: 'root',
})
export class LocalBoardService {
  cardsChanged = new Subject<Card[]>();

  private board!: Board;
  private lists: List[] = [];
  private cards: Card[] = [];

  constructor(private cardsService: CardsService) {}

  setBoard(board: Board) {
    this.board = board;
  }

  setCards(cards: Card[]) {
    this.cards = cards;
    this.cardsChanged.next(this.cards.slice());
  }

  setLists(lists: List[]) {
    this.lists = lists;
  }

  getCards() {
    return this.cards.slice();
  }

  getListCards(idList: string) {
    return this.getCards()
      .filter((card) => card.idList === idList)
      .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0));
  }

  updateCard(newCard: Card) {
    const index = this.cards.findIndex((card) => card.id === newCard.id);
    this.cards[index] = { ...newCard };
    this.cardsChanged.next(this.cards.slice());
    this.cardsService.update(newCard).subscribe();
  }
}
