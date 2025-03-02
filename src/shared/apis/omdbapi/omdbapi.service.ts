import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apiUrl} from '../../contants/constants';
import {Observable} from 'rxjs';
import {IMovie} from '../../models/movie';
import {IResponse} from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class OmdbapiService {

  constructor(private http: HttpClient) {

  }

  getMovies(title: string): Observable<IResponse>{
    const httpParams = new HttpParams()
      .set('s', title)
    return this.http.get<IResponse>(`${apiUrl}`, {
      params: httpParams
    })
  }
}
