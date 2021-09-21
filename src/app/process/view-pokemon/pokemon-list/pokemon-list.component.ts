import { UtilsService } from './../../../common/utils/utils.service';
import { PokemonItemComponent } from './../pokemon-item/pokemon-item.component';
import { Pokemon } from './../../../model/Pokemon-model';
import { PokemonService } from './../pokemon.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemonList: Pokemon[] = [];
  initialPokemonList: Pokemon[];
  displayedPokemonList: Pokemon[];
  @ViewChild('scrollPositionElement') scrollPositionElement;

  pokemon: Pokemon;
  searching = false;
  showSearchLoader = false;

  pokemonCountIndex = 1;
  pokemonCount = 5;


  pokemonSearchFound = false;

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog,
    private utils: UtilsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(res => {
      this.initialPokemonList = res;
      this.pokemonList = res;
      this.pokemonSearchFound = true;
    }, error => {
      console.error(error)
    })
  }

  getPokemon(name: string) {
    this.pokemonService.getPokemon(name).subscribe(data => {
      this.pokemon = data;
      console.log('==========data=======', data);
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

  onShowMore(e) {
    this.pokemonCountIndex ++;
  }

  onSearch(event): void {
    this.searching = false;
    this.pokemonSearchFound = false;
    this.pokemonList = this.initialPokemonList;
    const searchArray = this.pokemonList.map(pokemon => {
      return {
        name: pokemon.name
      }
    });

    const newSearchArray = this.utils.searchfilterArray(event.target.value, searchArray);
    const newPokemonList: Pokemon[] = [];

    for(let i = 0; i < newSearchArray.length; i++) {
      for(let j = 0; j < this.pokemonList.length; j++) {
        if(newSearchArray[i].name === this.pokemonList[j].name) {
            newPokemonList.push(this.pokemonList[j])
        }
      }
    }

    // this.pokemonList = newPokemonList;

    this.displayedPokemonList = newPokemonList;
    this.pokemonList = newPokemonList;
    if (newPokemonList.length === 0) {
      this.pokemonSearchFound = false;
    } else {
      this.pokemonSearchFound = true;
    }
    this.showSearchLoader = true
    setTimeout(() => {
      this.cdr.detectChanges();
      this.showSearchLoader = false;
      this.pokemonCountIndex = 1;
      this.searching = true;
    }, 1000);
  }

  showHideTimedSearchLoader() {
    this.showSearchLoader = true;
    setTimeout(() => {
      this.showSearchLoader = false;
    }, 500)
  }

  onPreviousPageButtonClick(data) {
    this.searching = false;
    this.displayedPokemonList = data.displayedItems;
    this.updatePaginationCountIndex(data);
    this.showHideTimedSearchLoader();
  }

  onNextPageButtonClick(data) {
    this.showSearchLoader = true;
    this.searching = false;
    this.displayedPokemonList = data.displayedItems;
    this.updatePaginationCountIndex(data);
    this.showHideTimedSearchLoader();
  }

  initializeDiplayedItems(data) {
    this.displayedPokemonList = data.displayedItems;
    this.cdr.detectChanges();
    this.updatePaginationCountIndex(data);
    // this.showHideTimedSearchLoader();
  }

  updatePaginationCountIndex(data) {
    this.pokemonCountIndex = data.countIndex;
    this.utils.scrollTo(this.scrollPositionElement.nativeElement);
  }

}
