import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http: HttpClient){}

  movieDatabase: string = 'https://movies-project-8c5d7-default-rtdb.firebaseio.com/movies.json';

  movie = {
    title: '',
    genre: '',
  };
  myMovies = [];
  onMovieListChanged = new Subject<any[]>();
  errorClicked = new Subject<any>();
  errorMsg: string = null;

  createMovie(t: string, g: string){
    this.movie.title = t;
    this.movie.genre = g;
    this.myMovies.push(this.movie);
    this.http.post(this.movieDatabase, this.movie).subscribe((res) => {
      console.log(res);
    });
    this.onMovieListChanged.next(this.myMovies.slice());
  }

  recieveMovies(){
    this.http.get(this.movieDatabase).subscribe(response => {
      this.myMovies = [];
      this.saveMovies(response);
      console.log(response)
    })
  }
  saveMovies(movies){
    for(let m in movies){
      this.myMovies.push(movies[m]);
    }
    this.onMovieListChanged.next(this.myMovies.slice());
  }
  clearMovies(){
    this.http.delete(this.movieDatabase).subscribe(response => {
      console.log(response);
    })
    this.myMovies = [];
    this.onMovieListChanged.next(this.myMovies.slice());
  }
  fakeData(){
    this.http.get('https://Im-a-fake-URL.com').subscribe(
      (response) => {
        console.log(response);

      },
      (error: HttpErrorResponse) => {
        this.errorMsg = error.message;
        this.errorClicked.next(this.errorMsg);
      })
  }
}
