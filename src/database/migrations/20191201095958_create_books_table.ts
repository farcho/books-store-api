import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(Table.BOOKS, table => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table
      .string('author')
      .notNullable()
      .unique();
    table.decimal('price').notNullable();
    table
      .string('keywords')
      .nullable()
    table.string('download_link');
    table.boolean('active').defaultTo(true);
    table.timestamps(true, true);
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('books');
}
