import {Component, input, output} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [
    MatLabel,
    MatFormField,
    MatProgressSpinner,
    MatInput,
    MatSuffix
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  searchMoviesOutput = output<Event>();
  loading = input(false)


  searchMovies(event: Event) {
    this.searchMoviesOutput.emit(event);
  }
}
