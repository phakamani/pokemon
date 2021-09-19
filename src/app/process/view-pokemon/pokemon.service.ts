import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pokemon } from 'src/app/model/Pokemon-model';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(): Observable<any> {
    const requestUrl = 'http://localhost:8080/api/pokemon';
    return this.http.get(requestUrl).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }


  getPokemon(pokemonUrl: string): Observable<Pokemon> {
    return this.http.get(pokemonUrl).pipe(
      map((data) => {

        const height = Number(data['height'])/10;
        const weight = Number(data['weight'])/10;
        const numberOfBattles = data['game_indices'].length.toString();
        const pokemon = {
          name: data['name'],
          url: data['sprites']["front_default"],
          type: data['types'][0].type.name,
          height: `${height}m`,
          weight: `${weight}kg`,
          numberOfBattles,
        }

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
