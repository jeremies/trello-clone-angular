import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  constructor(private apiService: ApiService) {}

  getAll(idBoard: string): Observable<List[]> {
    return this.apiService.get(
      `/boards/${idBoard}/lists`,
      new HttpParams({
        fromObject: { fields: 'name,pos' },
      })
    );
  }

  update(list: List): Observable<List> {
    return this.apiService.put(`/lists/${list.id}`, list);
  }
}
