const { Client } = require('pg');

// Database name
const DB_NAME = 'pottery';

const DB_URL =
  process.env.DATABASE_URL || `postgres://pottery:pottery-db.cc5iuj8cvbh1.us-east-2.rds.amazonaws.com/${DB_NAME}`;

let client;

// Github actions client config
// if (process.env.CI) {
//   client = new Client({
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: 'postgres',
//     database: 'postgres',
//   });
// } else {
//   // local / heroku client config
//   client = new Client(DB_URL);
// }

client = new Client({
  host: 'pottery-db.cc5iuj8cvbh1.us-east-2.rds.amazonaws.com',
  port: 5432,
  database: 'postgres',
  user: 'pottery',
  password: 'pottery1',
})

// Export
module.exports = client;
