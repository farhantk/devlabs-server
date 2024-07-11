// src/configs/db.js
const { Pool } = require('pg');
const logger = require('../../../utils/logger');

class DB {
  constructor() {
    this.pool = new Pool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || 'db_devlabs',
    });

    this.pool.on('error', (err) => {
      logger.error('Unexpected error on idle client', err);
    });

    this.pool.on('connect', () => {
      logger.info('Postgres database connected');
    });

    // Attempt an initial connection to check if the database is reachable
    this.initialConnect();
  }

  async initialConnect() {
    try {
      await this.pool.connect();
      logger.info('Initial database connection successful');
    } catch (err) {
      logger.error('Initial database connection error:', err);
      logger.info('Continuing to run server without database connection');
    }
  }

  async query(statement, values) {
    let client;
    try {
      client = await this.pool.connect();
      const res = await client.query(statement, values);
      return {
        ...res,
        error: null,
      };
    } catch (err) {
      logger.error('Database query error:', err);
      return {
        rows: [],
        error: err.message,
      };
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

module.exports = new DB();
