const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./router/auth.router");
const userRouter = require("./router/user.router");
const adminRouter = require("./router/admin.router");
const app = express();
const port = process.env.PORT || 3000;

const db = require("./config/db");

require("./config/createDB");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

// Connexion à la base de données
db.authenticate()
  .then(() => {
    console.log("Connexion à la base de données établie");
  })
  .catch((err) => {
    console.log("Erreur de connexion à la base de données:", err);
  });

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = server;
