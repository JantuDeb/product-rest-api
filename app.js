import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileupload from "express-fileupload";
import swaggerUi from'swagger-ui-express';
import YAML from'yamljs';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileupload());

//Swagger Docs
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDocument));

//routes
import postRoute from "./routes/product.routes.js";

app.use("/api", postRoute);

export default app;
