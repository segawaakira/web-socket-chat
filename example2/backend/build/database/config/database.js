"use strict";
require("dotenv/config");
const config = {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQLPORT),
    dialect: 'mysql',
};
module.exports = config;
