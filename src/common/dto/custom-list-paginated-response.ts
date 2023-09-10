export class CustomListPaginatedResponse<T> {
  count: number;
  items_per_page: number;
  num_pages: number;
  results: T[];

  constructor(
    count: number,
    items_per_page: number,
    num_pages: number,
    results: T[],
  ) {
    this.count = count;
    this.items_per_page = items_per_page;
    this.num_pages = num_pages;
    this.results = results;
  }
}
