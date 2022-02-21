import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants';
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

  drop(event: CdkDragDrop<List[]>) {
    const newList: List = { ...event.item.data };

    if (event.currentIndex === event.previousIndex) {
      return;
    }
    if (this.lists.length - 1 === event.currentIndex) {
      newList.pos =
        this.lists[this.lists.length - 1].pos +
        Constants.incrementPositionCards;
    } else if (event.currentIndex === 0) {
      newList.pos = this.lists[0].pos / 2;
    } else if (event.currentIndex > event.previousIndex) {
      newList.pos =
        (this.lists[event.currentIndex].pos +
          this.lists[event.currentIndex + 1].pos) /
        2;
    } else {
      newList.pos =
        (this.lists[event.currentIndex - 1].pos +
          this.lists[event.currentIndex].pos) /
        2;
    }

    this.lists[event.previousIndex] = { ...newList };
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    this.listsService.update(newList).subscribe();
  }
}
