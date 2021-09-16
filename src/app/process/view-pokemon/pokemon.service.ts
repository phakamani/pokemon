import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(): Observable<any> {
    const requestUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';
    return this.http.get(requestUrl).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }


  getPokemon(pokemonUrl: string): Observable<any> {
    return this.http.get(pokemonUrl).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }

  // tslint:disable-next-line: typedef
  handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError('Error! something went wrong');
  }




}
