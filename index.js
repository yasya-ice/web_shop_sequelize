const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

const sequelize = require("./utils/db");

sequelize.sync().then(() => {
	console.log("Database synchronized");
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

app.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});