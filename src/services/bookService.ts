import Book from '../models/Book';
import logger from '../utils/logger';
import * as object from '../utils/object';
import transform from '../utils/transform';
import BookPayload from '../domain/requests/BookPayload';
import BookDetail from '../domain/entities/BooksDetails';
import BadRequestError from '../exceptions/BadRequestError';
import config from '../config/config';
import * as constants from '../resources/constants/common';

const { messages } = config;
/**
 * Fetch all books from books table.
 *
 * @returns {Promise<BookDetail[]>}
 */
export async function fetchAll(params: any): Promise<BookDetail[]> {
  logger.log('info', 'Fetching books from database');

  const books = await new Book()
    .fetchPage({
      pageSize: params.limit, // Defaults to 10 if not specified
      page: params.offset // Passed to Model#fetchAll
    })
    .then((results: any) => {
      return results; // Paginated results object with metadata example below
    });

  const res = transform(books.serialize(), (book: BookDetail) => ({
    id: book.id,
    name: book.name,
    author: book.author,
    price: book.price,
    keywords: book.keywords,
    downloadLink: book.downloadLink,
    active: book.active,
    updatedAt: new Date(book.updatedAt).toLocaleString(),
    createdAt: new Date(book.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Fetched all books successfully:', res);

  return res;
}

export async function getBookById(bookId: number) {
  logger.log('info', 'Getting book by id from database');

  const book = await new Book({ id: bookId }).fetch();

  logger.log('debug', 'Fetched book successfully:', book);

  return book;
}

/**
 * Fetch book from given book author or name
 *
 * @param {string} author
 * @param {string} name
 * @returns {BookDetail}
 */
export async function getBookByAuthorOrName(author: string, name: string) {
  logger.log('info', 'Getting book by id from database');

  const book = await new Book().query({ where: { author }, orWhere: { name } }).fetch();

  logger.log('debug', 'Fetched book successfully:', book);

  if (book !== null) {
    throw new BadRequestError(`${messages.books.bookExists} ${capitalize(author)}`);
  }

  return book;
}

/**
 * Insert book from given book payload
 *
 * @param {BookPayload} params
 * @returns {Promise<BookDetail>}
 */
export async function insert(params: BookPayload): Promise<BookDetail> {
  logger.log('info', 'Inserting user into database:', params);

  const book = (await new Book({ ...params }).save()).serialize();

  logger.log('debug', 'Inserted user successfully:', book);

  return object.camelize(book);
}

export async function createDownloadLink(filename: string, id: number) {
  logger.log('info', 'Creating download link in books table:');
  const book = (
    await new Book().where({ id }).save(
      {
        download_link: `${constants.baseDownloadLink}${filename}-${id}`
      },
      { patch: true }
    )
  ).serialize();

  logger.log('debug', 'Inserted link successfully:', book);

  return object.camelize(book);
}

export async function setBookKeyWords(keyWords: any, bookId: number) {
  logger.log('info', 'Setting keywords in books table:');
  const book = (
    await new Book().where({ id: bookId }).save(
      {
        keywords: keyWords
      },
      { patch: true }
    )
  ).serialize();

  logger.log('debug', 'Inserted link successfully:', book);

  return object.camelize(book);
}

export async function changeBookStatus(id: number, status: boolean) {
  logger.log('info', 'Changing book status in books table:');
  const book = (
    await new Book().where({ id }).save(
      {
        active: status
      },
      { patch: true }
    )
  ).serialize();

  logger.log('debug', 'Book status updated successfully:', book);

  return object.camelize(book);
}

export async function countBooks(): Promise<any> {
  return await new Book().count();
}

/**
 * Capitalize first letter from given author name
 *
 * @param {str} params
 */
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
