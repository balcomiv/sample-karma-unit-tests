import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getData(): Observable<Object> {
    return this.http.get(this.url, { reportProgress: true });
  }

  getDataRandom(): Observable<Object> {
    return this.http.get('what/is/this');
  }
}
