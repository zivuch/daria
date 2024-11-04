const knex = require('knex');
require('dotenv').config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env;

module.exports = {
    db: knex({
        client: 'pg',
        connection: {
            host: PGHOST,
            database: PGDATABASE,
            user: PGUSER,
            password:  PGPASSWORD,
            port: PGPORT,
            ssl: {rejectUnauthorized:false},
        },

    })
}