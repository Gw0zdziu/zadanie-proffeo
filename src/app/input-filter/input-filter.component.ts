import {Component, output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-input-filter',
  imports: [
    MatLabel,
    MatFormField,
    MatInput
  ],
  templateUrl: './input-filter.component.html',
  styleUrl: './input-filter.component.css'
})
export class InputFilterComponent {
  initialValue: string = ''
  filterMoviesOutput = output<Event>()


  filterMovies(event: Event) {
    this.filterMoviesOutput.emit(event);
  }
}
