/**
 * Entity of SearchType
 *
 * @export
 * @class SearchType
 */
export class SearchType {
  type: string;

  /**
   *Creates an instance of SearchType.
   * @param {string} initialType
   * @memberof SearchType
   */
  constructor(initialType: string) {
    this.type = initialType;
  }

  /**
   * Function to set type
   *
   * @param {string} [newType]
   * @memberof SearchType
   */
  setType(newType?: string) {
    if (newType !== undefined) {
      this.type = newType;
    }
  }
}
