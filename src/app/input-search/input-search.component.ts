import {Component, input, output} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-input-search',
  imports: [
    MatLabel,
    MatFormField,
    MatProgressSpinner,
    MatInput,
    MatSuffix
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.css'
})
export class InputSearchComponent {
  searchMoviesOutput = output<Event>();
  loading = input(false)


  searchMovies(event: Event) {
    this.searchMoviesOutput.emit(event);
  }
}
