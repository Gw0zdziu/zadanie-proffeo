import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OmdbapiService} from '../shared/apis/omdbapi/omdbapi.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
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
import {CdkDropListGroup} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [MatFormField, MatInput, MatLabel, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRow, MatRowDef, FormsModule, MatNoDataRow, MatSort, MatSortHeader, CdkDropListGroup],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  dataTable = new MatTableDataSource<IMovie>([])
  columns: any[] = ['Poster', 'Title', 'Type', 'Year'];
  filterInput: any;
  errorResponse: string = '';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild('table', {static: true}) table: MatTable<IMovie>;
  constructor(private omdbapiService: OmdbapiService) {}

  ngOnInit() {


  }

  ngAfterViewInit() {
    this.dataTable.sort = this.matSort;
  }

  searchMovies(event: Event){
    this.filterInput = [];
    this.dataTable.filter = '';
    const inputValue = (event.target as HTMLInputElement).value;
    this.omdbapiService.getMovies(inputValue.trim().toLowerCase()).subscribe(x => {
      console.log(x.Search)
      if (x.Response === 'True'){
        this.dataTable.data = x.Search;
      } else if (x.Response === 'False') {
        this.dataTable.data = [];
        this.errorResponse = x.Error;
      }
    })
  }

  filterMovies(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = inputValue.trim().toLowerCase();
  }
}
