import { Pokemon } from './../../../model/Pokemon-model';
import { PokemonService } from './../pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemonList: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(res => {
      res.results.forEach((pokemon) => {
        const id = pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/', '');
        this.pokemonList.push({
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        })
      })
    }, error => {
      console.error(error)
    })
  }

}