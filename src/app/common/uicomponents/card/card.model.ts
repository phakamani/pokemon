import { Button } from './../form/form-button/button.model';
export class Card {
  constructor(
    public title: string,
    public imageUrl: string,
    public buttons: Button[]
  ) {}
}
