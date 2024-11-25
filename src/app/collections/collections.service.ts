import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  dataUrl = 'assets/data.json';
  constructor(private http: HttpClient) {}

  getCollections() {
    return this.http.get<object>(this.dataUrl);
  }
}
