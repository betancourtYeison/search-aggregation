import React from 'react';

/**
 * Function to render children with label
 *
 * @param {{ label: string; value: any; children: any; }} { label, value, children }
 * @returns
 */
function LineItem({ label, value, children }: { label: string; value: any; children: any }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return (
    <>
      <strong>{label}</strong>: {children(value)}
    </>
  );
}

/**
 * Function to render type on the right
 *
 * @param {{ value: any }} { value }
 * @returns
 */
function SearchType({ value }: { value: any }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return <div className="result__searchtype">{value}</div>;
}

/**
 * Function to render descriptions
 *
 * @param {{ value: any }} { value }
 * @returns
 */
function Description({ value }: { value: any }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return <p className="result__description" dangerouslySetInnerHTML={createMarkup(value)} />;
}

/**
 * Function to render html
 *
 * @param {*} html
 * @returns
 */
function createMarkup(html: any) {
  return { __html: html };
}

/**
 * Function to get data by field
 *
 * @param {*} result
 * @param {string} field
 * @returns
 */
function getField(result: any, field: string) {
  return result[field] || '';
}

/**
 * Function to show results
 *
 * @export
 * @param {{ searchResults: any }} { searchResults }
 * @returns
 */
export default function Results({ searchResults }: { searchResults: any }) {
  return (
    <ul>
      {searchResults.results.map((result: any, index: number) => (
        <li className="result" key={`${index}`}>
          <div className="result__header">
            <a
              className="result__title"
              href={getField(result, 'link')}
              target="_blank"
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={createMarkup(
                getField(result, 'htmlTitle') ? getField(result, 'htmlTitle') : getField(result, 'name'),
              )}
            />
            <SearchType value={result.type ? result.type : searchResults.requestId} />
          </div>

          <div className="result__body">
            {getField(result, 'pagemap') &&
              getField(result, 'pagemap').cse_image &&
              getField(result, 'pagemap').cse_image.map((value: any) => (
                <span key={value}>
                  <img src={value.src} alt="Dog Icon" className="search__logo" />
                </span>
              ))}
            <Description
              value={getField(result, 'htmlSnippet') ? getField(result, 'htmlSnippet') : getField(result, 'snippet')}
            />
          </div>

          <div className="result__footer">
            <div className="result__owner">
              <LineItem
                label="Display Link"
                value={
                  getField(result, 'displayLink') ? getField(result, 'displayLink') : getField(result, 'displayUrl')
                }
              >
                {(value: any) => (
                  <a target="_blank subtle-link" href={value}>
                    {value}
                  </a>
                )}
              </LineItem>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
