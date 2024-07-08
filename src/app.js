const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require("path");
const compression = require("express-compression");
const addLogger = require("./utils/logger.js");
const errorHandler = require("./middleware/error.js");
const PUERTO = 8080;
require("./database.js");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de la App Ecommerce Santa Maria",
      description: "Web de venta Panaderia",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");
const viewRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");

//Middleware
app.use(addLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(compression());
app.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

//passort
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//logger Middleware

app.get("/loggerTest", (req, res) => {
  req.logger.fatal("Error crítico: Fallo del sistema");
  req.logger.error("Error de base de datos: Conexión perdida");
  req.logger.warning(
    "Advertencia de seguridad: Intento de acceso no autorizado"
  );
  req.logger.info(
    "Información del sistema: Actualización de software disponible"
  );
  req.logger.http("Error 404: Página no encontrada");
  req.logger.debug("Advertencia de seguridad: Intento de acceso no autorizado");
  res.send("Logs generados!");
});

//Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewRouter);

// Error Handler Middleware
app.use(errorHandler);

app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto ${PUERTO} `);
});
