import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  @Output() search = new EventEmitter<any>();
  @Input() type: string;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  onSearchKeyDown(event): void {
    event.preventDefault();
    event.stopPropagation();
    if ((46 <= event.keyCode && event.keyCode < 91) ||
      event.target.value === '' || event.keyCode === 8
      ) {
      this.search.emit(event);
    }
  }
}
