import * as Knex from 'knex';

import * as bcrypt from '../../utils/bcrypt';
import Role from '../../resources/enums/Role';
import Table from '../../resources/enums/Table';

export function seed(knex: Knex): Promise<any> {
  return knex(Table.USERS).then(async () => {
    return Promise.all([
      knex(Table.USERS).insert([
        {
          role_id: Role.ADMIN,
          name: 'Edwin Barrera',
          email: 'farcho.barrera@gmail.com',
          password: await bcrypt.hash('admin123')
        }
      ])
    ]);
  });
}
