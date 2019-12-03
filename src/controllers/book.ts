import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import * as bookService from '../services/bookService';
import * as wordCountService from '../services/wordCount';
import BookPayload from '../domain/requests/BookPayload';
import path from 'path';
import logger from '../utils/logger';

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

    await bookService.getBookByAuthorOrName(bookPayload.author, bookPayload.name);

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

export async function downloadFile(req: Request, res: Response, next: NextFunction) {
  try {
    const file = path.join(`./uploads/${req.query.filename}.txt`);
    countWords(file)
    res.download(file);
  } catch (error) {
    next(error)
  }
}

/**
 * Handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function createDownloadLink(filename: string) {
  try {
    const file = filename.split('-');
    await bookService.createDownloadLink(file[0], parseInt(file[1], 0));
  } catch (err) {
    logger.log('Error', err.message);
  }
}

async function countWords(file) {
  try {
    const result = await wordCountService.countWords(file);
  } catch (error) {
    console.log(error)
  }

}


