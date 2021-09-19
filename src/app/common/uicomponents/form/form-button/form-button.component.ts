import { Button } from './button.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {
  @Input() data: Button;
  @Output() customClick = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    // console.log('=============data==========', this.data)
  }

  onButtonClick(event, data:Button) {
    event.preventDefault();
    this.customClick.emit({data, event})
  }
}
