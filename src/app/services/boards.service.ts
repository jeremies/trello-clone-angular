import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private apiKey = 'e560768469f6f03abdf5140f8ab93cae';
  private token =
    'dc3a4bc44701b0ef285421ae03eb30c8546593871e5afc7c17749e647813db29';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Board[]> {
    return this.apiService.get(
      '/members/me/boards',
      new HttpParams({
        fromObject: { fields: 'name', key: this.apiKey, token: this.token },
      })
    );
  }
}
