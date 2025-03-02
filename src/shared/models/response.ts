import {IMovie} from './movie';

export interface IResponse {
  Response: string,
  Search: IMovie[],
  totalResults: string,
}
