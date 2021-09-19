import { Button } from './../form/form-button/button.model';
import { Card } from './card.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: Card;
  @Output() cardButtonClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onActionButtonClick(card: Card) {
    console.log(card);
  }

  onCustomButtonClick(event) {

    this.cardButtonClick.emit(event)
  }

}
