import * as Knex from 'knex';

import Table from '../../resources/enums/Table';

export function seed(knex: Knex): Promise<any> {
  return knex(Table.BOOKS).then(async () => {
    return Promise.all([
      knex(Table.BOOKS).insert([
        {
          name: 'Javascript Fundamentals',
          author: 'Nick Morgan',
          price: 150,
          keywords: 'javascript arrays string number',
          download_link: 'http://localhost/3000/1'
        },
        {
          name: 'Composing Software',
          author: 'Eric Elliott',
          price: 1250,
          keywords: 'javascript es6 destructuring functions',
          download_link: 'http://localhost/3000/2'
        },
      ])
    ]);
  });
}
