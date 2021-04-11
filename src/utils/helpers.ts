/**
 * Compare the password using [isValidPassword]
 * @param text - The raw password from the user
 * @param password - Hashed password from the db
 */
import { compareSync } from 'bcrypt';
import { IPagination } from '../types/types';
import { INestPaginate } from '../types/types';

// @ts-ignore
export const isValidPassword = (text, password) => {
  return compareSync(text, password);
};

export const generateCode = (prefix: string) => {
  return `${prefix}-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
};

export const generateOrderCode = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const sluggify = (text: string) => {
  return text
    .replace(/\.+/g, '')
    .replace(/\/+/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

/**
 * Function for handling the pagination of the response data
 * @param data {Array}
 * @param itemsPerPage {Number}
 * @param pageNumber {Number}
 * @returns {{meta: {next: (null|string), offset: number, previous: (string|null), total_count: *, limit: number}, results: {total: *, pages: number, docs: *, limit: number, page: number}}}
 */
const paginate = (data: Array<{}>, pageNumber = 1, itemsPerPage = 20) => {
  const offset = Math.ceil((pageNumber - 1) * itemsPerPage);
  const nextOffset = parseInt(String(offset)) + parseInt(String(itemsPerPage));
  const previousOffset = offset - itemsPerPage < 1 ? 0 : offset - itemsPerPage;
  const previousPage =
    offset - itemsPerPage < 0
      ? 0
      : Math.ceil(previousOffset / itemsPerPage) + 1;
  const nextPage = Math.ceil(nextOffset / itemsPerPage) + 1;
  const pages = data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1;
  const meta = {
    limit: itemsPerPage,
    next: nextPage > pages ? null : `?limit=${itemsPerPage}&page=` + nextPage,
    offset: offset,
    previous: previousPage
      ? `?limit=${itemsPerPage}&page=` + previousPage
      : null,
    total_count: data.length,
  };
  const paginateObj = {
    docs: data.slice(offset, nextOffset),
    limit: Number(itemsPerPage),
    total: data.length,
    page: parseInt(String(pageNumber)),
    pages: pages,
  };
  return {
    paginateObj,
    meta,
  };
};

export const returnPagination = (docs: Array<{}>, meta: INestPaginate) => {
  const { itemsPerPage, totalItems, itemCount, totalPages, currentPage } = meta;
  const paginateObj = {
    docs,
    limit: Number(itemsPerPage),
    total: totalItems,
    pages: totalPages,
    page: currentPage,
  };
  const metaTag = {
    item_count: itemCount,
    limit: Number(itemsPerPage),
  };
  return {
    paginateObj,
    meta: metaTag,
  };
};

export { paginate };
