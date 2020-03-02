module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_DB || 'postgres://postgres:root@localhost/core_api_dev',
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/development`,
    },
  },
  test: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_TEST_DB || 'postgres://postgres:root@localhost/core_api_test',
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`,
    },
  },
  qa: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_DB,
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`,
    },
  },
};
