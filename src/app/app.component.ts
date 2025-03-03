import {Component, ViewChild} from '@angular/core';
import {OmdbapiService} from '../shared/apis/omdbapi/omdbapi.service';
import {IMovie} from '../shared/models/movie';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatSort, MatSortHeader, MatSortModule} from '@angular/material/sort';
import {delay, finalize, tap} from 'rxjs';
import {CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {InputComponent} from './input/input.component';

@Component({
  selector: 'app-root',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    FormsModule,
    MatNoDataRow,
    MatSort,
    MatSortHeader,
    CdkDropList,
    MatSortModule,
    InputComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  dataTable = new MatTableDataSource<IMovie>([])
  columns: string[] = [
    'Poster',
    'Title',
    'Type',
    'Year'
  ];
  searchInputValue: string;
  errorResponse: string = '';
  loadingSearch = false;
  loadingFilter = false;
  @ViewChild(MatSort) matSort!: MatSort;
  defaultImage: string = 'image-not-found.jpg';

  constructor(private omdbapiService: OmdbapiService) {
  }

  searchMovies(event: Event) {
    this.dataTable.filter = '';
    this.searchInputValue = (event.target as HTMLInputElement).value;
    if (this.searchInputValue !== '') {
      this.omdbapiService.getMovies(this.searchInputValue.trim().toLowerCase()).pipe(
        tap(() => this.loadingSearch = true),
        delay(500),
        finalize(() => this.loadingSearch = false),
      ).subscribe({
        next: x => {
          if (x.Response === 'True') {
            x.Search = x.Search.map((value) => {
              if (value.Poster === 'N/A'){
                return {...value, Poster: this.defaultImage};
              } else
                return value
            })
            this.dataTable.data = x.Search;
          } else if (x.Response === 'False') {
            this.dataTable.data = [];
            this.errorResponse = x.Error;
          }
        }
      })
    } else {
      this.dataTable.data = []
      this.errorResponse = '';
    }
  }

  filterMovies(event: Event) {
    this.loadingFilter = true;
    setTimeout(() => {
      const inputValue = (event.target as HTMLInputElement).value;
      this.dataTable.filter = inputValue.trim().toLowerCase();
      this.loadingFilter = false;
    }, 500);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  sort() {
    this.dataTable.sort = this.matSort;
  }
}
