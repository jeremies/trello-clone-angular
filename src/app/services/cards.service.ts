import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private apiService: ApiService) {}

  getAll(idBoard: string): Observable<Card[]> {
    return this.apiService.get(
      `/boards/${idBoard}/cards`,
      new HttpParams({
        fromObject: {
          fields: 'name,pos,idList',
        },
      })
    );
  }

  update(card: Card): Observable<Card> {
    return this.apiService.put(`/cards/${card.id}`, card);
  }

  create(card: Card): Observable<Card> {
    return this.apiService.post('/cards', card);
  }
}
