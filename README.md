Starter for Node.js Express API in Typescript.

## Requirements

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)

## Getting Started

```bash
$ https://github.com/farcho/books-store-api.git

$ cd books-store

$ cp .env.example .env # Update database credentials

$ yarn migrate
```

Start the application.

```bash
$ yarn build

$ yarn start # For production

$ yarn start:dev # For development
```

<p align="center">
  <a href="https://imgur.com/gallery/4rhTo"><img src="https://i.imgur.com/GpcDbLB.gif" /></a>
</p>

## Creating books-store database

To create the books-store database use command as below

```bash
$ createdbjs books-store --user=postgres --password=postgres
```

## Generating Migrations and Seeds

To create migration use `make:migration` and seed use `make:seeder`:

```bash
$ yarn make:migration create_{table_name}_table

$ yarn make:seeder {table_name}_table_seeder
```

Example,

```bash
$ yarn make:migration create_posts_table

$ yarn make:seeder post_table_seeder
```

Modify migration and seeder file as per the requirement. Then finally:

```bash
$ yarn migrate # to migrate

$ yarn seed # to seed
```
