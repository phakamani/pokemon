import { PaginationFooterComponent } from './common/uicomponents/pagination-footer/pagination-footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './process/view-pokemon/pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './process/view-pokemon/pokemon-item/pokemon-item.component';
import { CardComponent } from './common/uicomponents/card/card.component';
import { FormButtonComponent } from './common/uicomponents/form/form-button/form-button.component';
import { DialogComponent } from './common/uicomponents/dialog/dialog.component';
import { SearchComponent } from './common/uicomponents/search/search.component'

import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';

import {FlexLayoutModule} from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonItemComponent,
    CardComponent,
    FormButtonComponent,
    DialogComponent,
    PaginationFooterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatBadgeModule,

    FlexLayoutModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent],
  entryComponents: [PokemonItemComponent]
})
export class AppModule { }
