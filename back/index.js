const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const hpp = require("hpp");
require("dotenv").config();

const authRouter = require("./router/auth.router");
const userRouter = require("./router/user.router");
const f1 = require("./BigData/f1");
const db = require("./config/db");
const rateLimit = require("express-rate-limit");
const { createDB } = require("./config/createDB");

const port = process.env.PORT || 3000;


const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Connexion à la base de données
db.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connecting error", err);
  });

createDB().then(() => {
  console.log('Tables created');
});


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false, // désactiver la politique de sécurité du contenu si elle est déjà définie
    frameguard: {
      action: "sameorigin",
    },
    noSniff: true,
  })
);

app.use(limiter);
app.use(hpp());

app.use("/auth", authRouter);
app.use("/user", userRouter);

// Github

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.log("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in .env file");
  process.exit(1);
}

app.get("/getAccessToken", async function (req, res) {
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    res.send(data);
  });
});

app.get("/getUserData", async function (req, res) {
  req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    res.json(data);
  });
});

app.get("/races", async (req, res) => {
  const races = await f1.getRaces();
  if (races) {
    res.json(races);
  } else {
    res.status(500).send("Error fetching races");
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (data) => {
    console.log(`received message: ${data}`);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Simon (Response-Caching)
const cacheMiddleware = require("./middleware/cache.middleware.js");

// temps = 10 secondes de mise en cache
app.get("/cache", cacheMiddleware(10), (req, res) => {
  const timestamp = new Date().toLocaleTimeString();
  res.send(`The cached GET request (10 sec): ${timestamp}`);
});

module.exports = server;
