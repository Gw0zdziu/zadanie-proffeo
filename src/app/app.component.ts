import {Component, inject, ViewChild} from '@angular/core';
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
import {MatSort, MatSortHeader, MatSortModule, Sort} from '@angular/material/sort';
import {delay, finalize, tap} from 'rxjs';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {InputComponent} from './input/input.component';
import {LiveAnnouncer} from '@angular/cdk/a11y';

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
    CdkDrag,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataTable = new MatTableDataSource<IMovie>([])
  columns: string[] = [
    'Poster',
    'Title',
    'Type',
    'Year'
  ];
  errorResponse: string = '';
  loadingSearch = false;
  loadingFilter = false;
  @ViewChild(MatSort) matSort!: MatSort;
  defaultImage: string = 'image-not-found.jpg';

  constructor(private omdbapiService: OmdbapiService) {
  }

  searchMovies(event: Event) {
    this.dataTable.filter = '';
    const searchInputValue = (event.target as HTMLInputElement).value.trim().toLowerCase()
    if (searchInputValue !== '') {
      this.omdbapiService.getMovies(searchInputValue).pipe(
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

  sort(event: Sort) {
    this.dataTable.sort = this.matSort;
    if (event.direction) {
      this._liveAnnouncer.announce(`Sorted ${event.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
