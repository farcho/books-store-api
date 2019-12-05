import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class Book extends bookshelf.Model<Book> {
  fetchPage: any;
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.BOOKS;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default Book;
