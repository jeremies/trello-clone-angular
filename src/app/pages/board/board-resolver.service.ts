import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Board } from 'src/app/models/board.model';
import { BoardsService } from 'src/app/services/boards.service';

@Injectable({ providedIn: 'root' })
export class BoardResolver implements Resolve<Board> {
  constructor(private boardsService: BoardsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.boardsService
      .get(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
