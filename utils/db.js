const { Sequelize } = require("sequelize");

const db = new Sequelize("web_shop", "root", "qwerty11", {
	host: "localhost",
	dialect: "mysql",
});

module.exports = db;