import { SearchType } from '../entities';

/**
 * Function to interact with entity
 *
 * @export
 * @class SearchTypeInteractor
 */
export class SearchTypeInteractor {
  searchType: SearchType;

  constructor(initialType: string) {
    this.searchType = new SearchType(initialType);
  }

  updateType(newType?: string): SearchType {
    this.searchType.setType(newType);

    if (!this.searchType.type) {
      this.searchType = new SearchType('Google');
    }

    return this.searchType;
  }
}
