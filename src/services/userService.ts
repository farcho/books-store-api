import User from '../models/User';
import logger from '../utils/logger';
import * as bcrypt from '../utils/bcrypt';
import * as object from '../utils/object';
import transform from '../utils/transform';
import Role from '../resources/enums/Role';
import UserDetail from '../domain/entities/UserDetail';
import UserPayload from '../domain/requests/UserPayload';
import BadRequestError from '../exceptions/BadRequestError';
import config from '../config/config';

const { messages } = config;
/**
 * Fetch all users from users table.
 *
 * @returns {Promise<UserDetail[]>}
 */
export async function fetchAll(): Promise<UserDetail[]> {
  logger.log('info', 'Fetching users from database');

  const users = await User.fetchAll();
  const res = transform(users.serialize(), (user: UserDetail) => ({
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    updatedAt: new Date(user.updatedAt).toLocaleString(),
    createdAt: new Date(user.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Fetched all users successfully:', res);

  return res;
}

export async function getUserByEmail(userEmail: string): Promise<UserDetail> {
  logger.log('info', 'Getting user by email from database');

  let user = await new User().where({ email: userEmail }).fetch();

  logger.log('debug', 'Fetched user successfully:', user);

  if (user !== null) {
    throw new BadRequestError(messages.users.userExists);
  }

  return user

}

/**
 * Insert user from given user payload
 *
 * @param {UserPayload} params
 * @returns {Promise<UserDetail>}
 */
export async function insert(params: UserPayload): Promise<UserDetail> {
  logger.log('info', 'Inserting user into database:', params);

  const password = await bcrypt.hash(params.password);
  const user = (await new User({ ...params, password, roleId: Role.NORMAL_USER }).save()).serialize();

  logger.log('debug', 'Inserted user successfully:', user);

  return object.camelize(user);
}
