import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  scrollTo(nativeElement) {
    setTimeout(()=> {
      nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, 500);
  }

  searchfilterArray(searchString, searchArray: any[]) {
    const tempArray: any[] = [];
    if(searchString === '') {
      return searchArray;
    }
    for (const searchArrayObject of searchArray) {
      for (const objectValue of Object.values(searchArrayObject)) {
        if(objectValue !== null) {
          const searchValue = objectValue.toString().toLowerCase();
          if (searchValue.indexOf(searchString.toLowerCase()) !== -1) {
            tempArray.push(searchArrayObject);
            break;
          }
        }
      }
    }
    return tempArray;
  }
}
