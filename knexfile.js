// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'ec2-52-70-15-120.compute-1.amazonaws.com',
      user: 'yntoptmemdbnhi',
      password: 'c586cbe6a323542ef2a77ac4e4ae174683140a9f58fdf9cc947432eaf25a821c',
      database: 'dfk1kccnkchri3'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  teste: {
    client: 'pg',
    connection: {
      host: 'ec2-52-70-15-120.compute-1.amazonaws.com',
      user: 'yntoptmemdbnhi',
      password: 'c586cbe6a323542ef2a77ac4e4ae174683140a9f58fdf9cc947432eaf25a821c',
      database: 'dfk1kccnkchri3',
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: './src/database/migrations'
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'd990jcgvd0kl1d',
      user:     'fptyftxizmaemc',
      password: '8da6fc290a632882f3aa415da0cd212d608b2b72d34512cefda2e1e01f1baf03'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
