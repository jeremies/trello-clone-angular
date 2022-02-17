import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService.getAll().subscribe((data) => {
      this.boards = data;
    });
  }
}
