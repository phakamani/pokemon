export class PaginationFooterModel {
  constructor(
    public count?: number,
    public countIndex?: number,
    public items?: any[],
    public displayedItems?: any[],
    public searching?: boolean
  ) { }
}
