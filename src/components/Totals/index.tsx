import React from 'react';

/**
 * Function to render totals
 *
 * @export
 * @param {{
 *   currentPage: number;
 *   pageSize: number;
 *   totalResults: number;
 * }} {
 *   currentPage,
 *   pageSize,
 *   totalResults,
 * }
 * @returns
 */
export default function Totals({
  currentPage,
  pageSize,
  totalResults,
}: {
  currentPage: number;
  pageSize: number;
  totalResults: number;
}) {
  const start = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = totalResults <= pageSize ? totalResults : start + pageSize - 1;

  return (
    <div className="results__result-count">
      Showing{' '}
      <strong>
        {start} - {end}
      </strong>{' '}
      of <strong>{totalResults}</strong>
    </div>
  );
}
