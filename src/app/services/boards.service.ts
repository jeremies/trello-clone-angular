import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Board[]> {
    return this.apiService.get(
      '/members/me/boards',
      new HttpParams({
        fromObject: { fields: 'name' },
      })
    );
  }

  get(id: string): Observable<Board> {
    return this.apiService.get(
      `/boards/${id}`,
      new HttpParams({
        fromObject: { fields: 'name,prefs' },
      })
    );
  }
}
