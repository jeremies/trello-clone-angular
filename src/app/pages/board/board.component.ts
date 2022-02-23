import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Board } from 'src/app/models/board.model';
import { List } from 'src/app/models/list.model';
import { CardsService } from 'src/app/services/cards.service';
import { ListsService } from 'src/app/services/lists.service';
import { LocalCardsService } from 'src/app/services/local-cards.service';
import { LocalListsService } from 'src/app/services/local-lists.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  board!: Board;
  lists: List[] = [];
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private cardsService: CardsService,
    private localCardsService: LocalCardsService,
    private localListsService: LocalListsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.board = data['board'];

      this.populateLists();
      this.populateCards();
    });

    this.subscription = this.localListsService.listsChanged.subscribe(
      (lists: List[]) => {
        this.lists = this.localListsService.getLists();
      }
    );

    this.lists = this.localListsService.getLists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  populateLists() {
    this.listsService
      .getAll(this.board.id)
      .subscribe((lists) => this.localListsService.setLists(lists));
  }

  populateCards() {
    this.cardsService
      .getAll(this.board.id)
      .subscribe((cards) => this.localCardsService.setCards(cards));
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

    this.localListsService.updateList(newList);
  }

  getStyle() {
    const backgroundImage = this.board.prefs.backgroundImage;
    const style = `background-image: url(${backgroundImage})`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
