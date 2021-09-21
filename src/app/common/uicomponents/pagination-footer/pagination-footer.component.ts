import { PaginationFooterModel } from './pagination-footer.model';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination-footer',
  templateUrl: './pagination-footer.component.html',
  styleUrls: ['./pagination-footer.component.scss']
})
export class PaginationFooterComponent implements OnInit, AfterViewInit {
  @Input() data: PaginationFooterModel;
  @Output() previousButtonClick = new EventEmitter<PaginationFooterModel>();
  @Output() nextButtonClick = new EventEmitter<PaginationFooterModel>();
  @Output() initializeDiplayedItems = new EventEmitter<PaginationFooterModel>();
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.updateDisplayedItems();
    this.initializeDiplayedItems.emit({
      countIndex: this.data.countIndex,
      displayedItems: this.data.displayedItems
    });
  };

  updateDisplayedItems() {
    this.data.displayedItems = this.data.items.slice((this.data.countIndex - 1) *
      this.data.count, (this.data.countIndex) * this.data.count);
  }

  onPreviousPageButtonClick() {
    this.data.countIndex--;
    this.updateDisplayedItems();
    this.previousButtonClick.emit({
      countIndex: this.data.countIndex,
      displayedItems: this.data.displayedItems
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const data = changes.data.currentValue;
    const changeIndicator = data === this.data;
    if (changeIndicator) {
      if(this.data.searching) {
        this.updateDisplayedItems();
        this.initializeDiplayedItems.emit({
          countIndex: 1,
          displayedItems: this.data.displayedItems
        });
      }
    }
  }

  onNextPageButtonClick() {
    this.data.countIndex++;
    this.updateDisplayedItems();
    this.nextButtonClick.emit({
      countIndex: this.data.countIndex,
      displayedItems: this.data.displayedItems
    });
  }
}
