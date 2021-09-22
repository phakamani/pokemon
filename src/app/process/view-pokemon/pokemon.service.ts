import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pokemon } from 'src/app/model/Pokemon-model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(): Observable<any> {
    const requestUrl = `${environment.api}/api/`;
    return this.http.get(requestUrl).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }


  getPokemon(name: string): Observable<Pokemon> {

    const requestUrl = `${environment.api}/api/${name}`;
    return this.http.get(requestUrl).pipe(
      map((data) => {
        const pokemon: Pokemon = data;
        pokemon.height = `${data['height']/10}m`;
        pokemon.weight = `${data['weight']/10}kg`
        return pokemon;
    }),
    catchError(this.handleError));
  }

  // tslint:disable-next-line: typedef
  handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError('Error! something went wrong');
  }




}
