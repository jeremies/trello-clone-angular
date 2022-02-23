import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants';
import { LocalCardsService } from 'src/app/services/local-cards.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  @Input() idList: string = '';
  showCardInput: boolean = false;
  cardName: string = '';

  constructor(private localCardsService: LocalCardsService) {}

  ngOnInit(): void {}

  openCardInput() {
    this.showCardInput = true;
  }

  closeCardInput() {
    this.showCardInput = false;
    this.cardName = '';
  }

  addCard() {
    const currentCards = this.localCardsService.getListCards(this.idList);
    let pos = Constants.incrementPositionCards;
    if (currentCards.length > 0) {
      pos += currentCards[currentCards.length - 1].pos;
    }
    this.localCardsService.addCard({
      id: Constants.idNew,
      name: this.cardName,
      pos,
      idList: this.idList,
    });
    this.cardName = '';
  }
}
