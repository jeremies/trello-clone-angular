import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Card } from '../models/card.model';
import { CardsService } from './cards.service';

@Injectable({
  providedIn: 'root',
})
export class LocalCardsService {
  cardsChanged = new Subject<Card[]>();

  private cards: Card[] = [];

  constructor(private cardsService: CardsService) {}

  setCards(cards: Card[]) {
    this.cards = cards;
    this.cardsChanged.next(this.cards.slice());
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

  addCard(card: Card) {
    this.cards.push(card);
    this.cardsChanged.next(this.cards.slice());
    this.cardsService.create(card).subscribe((newCard: Card) => {
      card.id = newCard.id;
      this.cardsChanged.next(this.cards.slice());
    });
  }
}
