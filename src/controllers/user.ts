import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as userService from '../services/userService';
import UserPayload from '../domain/requests/UserPayload';

const { messages } = config;

/**
 * Handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    const { offset } = req.query;

    const response = await userService.fetchAll({
      offset,
      limit: res.locals.limit,
      pageSize: res.locals.pageCount
    });

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: {
        users: response,
        pageCount: res.locals.pageCount,
        recordsCount: res.locals.recordsCount
      },
      message: messages.users.fetchAll
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
export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload = req.body as UserPayload;

    await userService.getUserByEmail(userPayload.email);

    const response = await userService.insert(userPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}

export async function changeUserStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, status } = req.body;
    const response = await userService.changeUserStatus(id, status);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.setStatus
    });
  } catch (error) {
    next(error);
  }
}
