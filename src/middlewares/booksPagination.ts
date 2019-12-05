import { Request, Response, NextFunction } from 'express';

import * as bookService from '../services/bookService';

/**
 * A middleware to paginate the book list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function booksPagination(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit } = req.query;

    const recordsCount = await bookService.countBooks();

    const pageCount = limit === 0 ? 0 : Math.ceil(recordsCount / limit);

    res.locals.pageCount = pageCount;
    res.locals.recordsCount = parseInt(recordsCount);
    res.locals.limit = limit;

    next();
  } catch (error) {
    next(error);
  }

}

export default booksPagination;
