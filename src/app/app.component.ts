import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {delay, finalize, tap} from 'rxjs';
import {InputSearchComponent} from './input-search/input-search.component';
import {InputFilterComponent} from './input-filter/input-filter.component';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

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
    InputSearchComponent,
    InputFilterComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  dataTable = new MatTableDataSource<IMovie>([])
  columns: string[] = [
    'Poster',
    'Title',
    'Type',
    'Year'
  ];
  searchInputValue: string;
  errorResponse: string = '';
  loading = false;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private omdbapiService: OmdbapiService) {}

  ngOnInit() {


  }

  ngAfterViewInit() {
    this.dataTable.sort = this.matSort;
  }

  searchMovies(event: Event) {
    this.dataTable.filter = '';
    this.searchInputValue = (event.target as HTMLInputElement).value;
    this.omdbapiService.getMovies(this.searchInputValue.trim().toLowerCase()).pipe(
      tap(() => this.loading = true),
      delay(600),
      finalize(() => this.loading = false),
    ).subscribe({
      next: x => {
        console.log(x)
        if (x.Response === 'True') {
          this.dataTable.data = x.Search;
        } else if (x.Response === 'False') {
          this.dataTable.data = [];
          this.errorResponse = x.Error;
        }
      }
    })
  }

  filterMovies(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = inputValue.trim().toLowerCase();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
