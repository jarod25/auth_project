const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./router/auth.router");
const userRouter = require("./router/user.router");
const adminRouter = require("./router/admin.router");
const csurf = require("csurf"); // Ajout de la bibliothèque csurf
const app = express();
const port = process.env.PORT || 3000;
const hpp = require("hpp");
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080", // Frontend URL
  },
});
const db = require("./config/db");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

require("./config/createDB");

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
app.use("/admin", adminRouter);

// Connexion à la base de données
db.authenticate()
  .then(() => {
    console.log("Connexion à la base de données établie");
  })
  .catch((err) => {
    console.log("Erreur de connexion à la base de données:", err);
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

const socketServer = io.listen(3001); // serveur Socket.io

console.log(
  "Server running on http://localhost:3000 and http://localhost:3001"
);

module.exports = server;
