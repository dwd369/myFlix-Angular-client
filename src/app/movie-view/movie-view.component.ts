import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Movie-View represents a component that displays additional detaills of a movie
 * including title and description
 *
 * @example
 * <!-- In a template -->
 * <MovieViewComponent [movie]="movieData"></MovieViewComponent>
 *
 * @example
 * // In a component
 * const movieData = {
 *   title: 'Inception',
 *   description: 'Test'
 * };
 */

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrl: './movie-view.component.scss'
})

export class MovieViewComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string
      content: string
    }
  ) {}

  ngOnInit(): void {}
}