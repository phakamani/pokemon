import { PokemonItemComponent } from './../pokemon-item/pokemon-item.component';
import { Pokemon } from './../../../model/Pokemon-model';
import { PokemonService } from './../pokemon.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemonList: Pokemon[] = [];
  pokemon: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(res => {
      res.results.forEach((pokemon) => {
        const id = pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/', '');
        this.pokemonList.push({
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        })

      })
    }, error => {
      console.error(error)
    })
  }

  getPokemon(name: string) {
    this.pokemonService.getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`).subscribe(data => {
      this.pokemon = data;
      this.dialog.open(PokemonItemComponent, {
        height: '400px',
        width: '600px',
        data
      });

    })
  }

  onCardButtonClick(event) {
    this.getPokemon(event.data.name)
  }

}
