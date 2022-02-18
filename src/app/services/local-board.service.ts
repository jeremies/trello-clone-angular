import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Board } from '../models/board.model';
import { Card } from '../models/card.model';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class LocalBoardService {
  cardsChanged = new Subject<Card[]>();

  private board!: Board;
  private lists: List[] = [];
  private cards: Card[] = [];

  constructor() {}

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
}
