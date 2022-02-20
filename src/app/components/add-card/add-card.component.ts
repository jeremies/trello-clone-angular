import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants';
import { LocalBoardService } from 'src/app/services/local-board.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  @Input() idList: string = '';
  showCardInput: boolean = false;
  cardName: string = '';

  constructor(private localBoardService: LocalBoardService) {}

  ngOnInit(): void {}

  openCardInput() {
    this.showCardInput = true;
  }

  closeCardInput() {
    this.showCardInput = false;
    this.cardName = '';
  }

  addCard() {
    const currentCards = this.localBoardService.getListCards(this.idList);
    const pos =
      currentCards[currentCards.length - 1].pos +
      Constants.incrementPositionCards;
    this.localBoardService.addCard({
      id: '0',
      name: this.cardName,
      pos,
      idList: this.idList,
    });
    this.cardName = '';
  }
}
