import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import * as bookService from '../services/bookService';
import BookPayload from '../domain/requests/BookPayload';

const { messages } = config;

/**
 * Handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function index(_: Request, res: Response, next: NextFunction) {
  try {
    const response = await bookService.fetchAll();

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.books.fetchAll
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getBook(req: Request, res: Response, next: NextFunction) {
  try {
    const bookId = req.query.id;

    const response = await bookService.getBookById(bookId);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    const bookPayload = req.body as BookPayload;

    console.log('*****'.repeat(50))
    console.log(bookPayload)
    const result = await bookService.getBookByAuthorOrName(bookPayload.author, bookPayload.name);

    console.log(result)

    const response = await bookService.insert(bookPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.books.insert
    });
  } catch (err) {
    next(err);
  }
}



/**
 * Handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fileUpload(req: Request, res: Response, next: NextFunction) {
  try {

    console.log('*****'.repeat(50))
    console.log(req.body)


    // const result = await bookService.getBookByAuthorOrName(bookPayload.author, bookPayload.name);

    // console.log(result)

    //const response = await bookService.insert(bookPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: 'OK',
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}


