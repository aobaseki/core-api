module.exports = {
  development: {
    client: 'mysql',
    connection:{
      host:'127.0.0.1',
      user:'root',
      password:'',
      database:'core_api_test'
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/development`,
    },
  },
  test: {
    client: 'mysql',
    // connection: process.env.POSTGRESQLCONNSTR_TEST_DB || 'postgres://localhost/core_api_test',
    connection:{
      host:'127.0.0.1',
      user:'root',
      password:'',
      database:'core_api_test'
    },

    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`,
    },
  },
  qa: {
    client: 'mysql',
    connection: process.env.POSTGRESQLCONNSTR_DB,
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`,
    },
  },
};
