const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const exphbs = require("express-handlebars");
const app = express();
const PUERTO = 8080;
require("./database.js");
const passport = require("passport");
const viewRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
const mockingRouter = require("./routes/mocking.router.js");
const initializePassport = require("./config/passport.config.js");

const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://bryhansalazarpacsi:coderhouse@cluster0.nhj6jza.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 100,
    }),
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", mockingRouter);
app.use("/", viewRouter);

app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto ${PUERTO} `);
});
