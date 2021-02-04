// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'ec2-54-162-119-125.compute-1.amazonaws.com',
      user: 'sklwmdbzgkwvqr',
      password: '8bb4a5a2381b0061a8b08125c0f1310e837b22962024fb141ccfb820396ecf43',
      database: 'dc9cedfs2a6pn6',
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: './src/database/migrations'
    },
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
      directory: './'
    },
  },

};
