import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';

/**
 * A middleware to paginate the user list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function usersPagination(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit } = req.query;

    const recordsCount = await userService.countBooks();

    const pageCount = limit === 0 ? 0 : Math.ceil(recordsCount / limit);

    res.locals.pageCount = pageCount;
    res.locals.recordsCount = parseInt(recordsCount);
    res.locals.limit = limit;

    next();
  } catch (error) {
    next(error);
  }

}

export default usersPagination;
