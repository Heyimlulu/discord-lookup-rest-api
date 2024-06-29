import http from "http";
import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import routes from "./routes";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { getEnvironmentBaseUrl } from "./utils/environment";
import swaggerDocument from "../public/swagger.json";
import { RegisterRoutes } from "./routes/routes";

const router: Express = express();

// const excludedDomains = ["discord.name"];
// const apiLimiter = rateLimit({
//   windowMs: 2 * 60 * 1000, // 2 minutes
//   max: 10, // limit each IP to 10 requests per windowMs
//   message: "Too many requests from this IP, please try again after 2 minutes",
//   handler: (req: Request, res: Response) => {
//     return res.status(429).json({
//       status: 429,
//       message:
//         "Too many requests from this IP, please try again after 2 minutes",
//     });
//   },
//   skip: (req: Request, res: Response) => {
//     const requestDomain = req.hostname;
//     return excludedDomains.includes(requestDomain);
//   },
// });

// Rate limiter
// router.use(apiLimiter);
// Logging
router.use(morgan("dev"));
// Parse the request
router.use(express.urlencoded({ extended: false }));
// Takes care of JSON data
router.use(express.json());

// Rules
router.use((req: Request, res: Response, next: NextFunction) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET");
    return res.status(200).json({});
  }
  next();
});

router.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

router.use("/static", express.static("./public/assets/flags"));

const environment = process.env.NODE_ENV || "development";
const port = process.env.PORT || "8080";

router.use("/", routes);

RegisterRoutes(router);

// Error handling
router.use((req: Request, res: Response) => {
  const error = new Error("I think you got lost");
  return res.status(404).json({
    message: error.message,
  });
});

// Server
const httpServer = http.createServer(router);
httpServer.listen(port, () =>
  console.log(`The server is running on port ${port}`)
);
