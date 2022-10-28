import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieServiceService } from './movie-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(private ms: MovieServiceService){}

  private movieSub: Subscription;
  private sub: Subscription;
  movieList = [];
  loading: boolean = false;
  error: string = null;
  placeHolder: string = 'Not Showing Error!';

  ngOnInit(){
    this.movieSub = this.ms.onMovieListChanged.subscribe(arr => {
      this.movieList = arr;
      this.loading = false;
    })
    this.sub = this.ms.errorClicked.subscribe(err => {
      this.error = err;
    })
  }

  onCreateMovie(t: string, g: string){
    this.ms.createMovie(t, g);

  }
  onRecieveMovies(){
    this.ms.recieveMovies();
    this.loading = true;
  }
  onClearMovies(){
    this.ms.clearMovies();
  }
  ngOnDestroy(): void {
      this.movieSub.unsubscribe();
  }
  getFakeData(){
    this.ms.fakeData();
  }
}
