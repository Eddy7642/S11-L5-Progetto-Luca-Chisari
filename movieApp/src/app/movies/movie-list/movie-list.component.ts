import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {
addToFavorites(arg0: any) {
throw new Error('Method not implemented.');
}
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get<any[]>('http://localhost:3000/movies-popular').subscribe((movies) => {
    this.movies = movies;
  });
}
}
