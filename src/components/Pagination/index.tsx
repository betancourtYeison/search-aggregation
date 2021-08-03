import React from 'react';
import RCPagination from 'rc-pagination';

import 'rc-pagination/assets/index.css';

/**
 * Component to render pagination
 *
 * @export
 * @param {{
 *   currentPage: number;
 *   pageSize: number;
 *   totalPages: number;
 *   onPage: any;
 * }} {
 *   currentPage,
 *   pageSize,
 *   totalPages,
 *   onPage,
 * }
 * @returns
 */
export default function Pagination({
  currentPage,
  pageSize,
  totalPages,
  onPage,
}: {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPage: (page: number, pageSize: number) => void;
}) {
  return <RCPagination pageSize={pageSize} current={currentPage} total={totalPages} onChange={onPage} />;
}
