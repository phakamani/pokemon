import { Card } from './card.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: Card;

  constructor() { }

  ngOnInit(): void {
  }

  onActionButtonClick(card: Card) {
    console.log(card);
  }

}
