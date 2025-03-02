import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../../contants/constants';

@Injectable({
  providedIn: 'root'
})
export class OmdbapiService {

  constructor(private http: HttpClient) {

  }

  getMovies(){
    return this.http.get(apiUrl)
  }
}
