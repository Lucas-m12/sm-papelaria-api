import { ExpressAdapter } from "./express-adapter";
import { configureProductRoutes } from "./routes/product-routes";


const app = new ExpressAdapter();
const port = Number(process.env.PORT) || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

configureProductRoutes(app);

// app.use(errorHandler); // Use the error handler middleware

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
