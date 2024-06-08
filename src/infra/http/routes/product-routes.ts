import { ProductController } from "../controllers/product-controller";
import type { HttpAdapter } from "../http-adapter";

export function configureProductRoutes(httpAdapter: HttpAdapter): void {
  const productController = new ProductController();

  httpAdapter.post("/api/products", (req, res, next) =>
    productController.create(req, res, next),
  );

  httpAdapter.get("/api/products", (req, res, next) =>
    productController.index(req, res, next),
  );

  httpAdapter.get("/api/products/:id", (req, res, next) =>
    productController.show(req, res, next),
  );

  httpAdapter.put("/api/products/:id", (req, res, next) =>
    productController.update(req, res, next),
  );

  httpAdapter.delete("/api/products/:id", (req, res, next) =>
    productController.delete(req, res, next),
  );
}
