import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {OmdbapiService} from '../shared/apis/omdbapi/omdbapi.service';
import {JsonPipe, NgOptimizedImage} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {IMovie} from '../shared/models/movie';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {IResponse} from '../shared/models/response';
import {Target} from '@angular/compiler';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, MatFormField, MatInput, MatLabel, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRow, MatRowDef, MatPaginator, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  dataTable = new MatTableDataSource<IMovie>([])
  columns: string[] = ['poster', 'title', 'type', 'year'];

  constructor(private omdbapiService: OmdbapiService) {
  }

  ngOnInit() {
  }

  searchMovies(e: Event){
    const inputValue = (e.target as HTMLInputElement).value;
    this.omdbapiService.getMovies(inputValue).subscribe(x => {
      this.dataTable.data = x.Search;
    })
  }
}
