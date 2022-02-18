import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private apiKey = 'e560768469f6f03abdf5140f8ab93cae';
  private token =
    'dc3a4bc44701b0ef285421ae03eb30c8546593871e5afc7c17749e647813db29';

  constructor(private apiService: ApiService) {}

  getAll(idBoard: string): Observable<List[]> {
    return this.apiService.get(
      `/boards/${idBoard}/lists`,
      new HttpParams({
        fromObject: { fields: 'name,pos', key: this.apiKey, token: this.token },
      })
    );
  }
}
