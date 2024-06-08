import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import type {
  HttpAdapter,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "./http-adapter";

class ExpressRequest implements HttpRequest {
  constructor(private req: Request) {}

  get body() {
    return this.req.body;
  }

  get params() {
    return this.req.params;
  }

  get query() {
    return this.req.query;
  }
}

class ExpressResponse implements HttpResponse {
  constructor(private res: Response) {}

  status(code: number): HttpResponse {
    this.res.status(code);
    return this;
  }

  json(data: any): void {
    this.res.json(data);
  }

  setHeader(name: string, value: string): void {
    this.res.header(name, value);
  }
}

export class ExpressAdapter implements HttpAdapter {
  private app = express();

  constructor() {
    this.app.use(express.json());
  }

  post(path: string, handler: HttpHandler): void {
    this.app.post(path, (req: Request, res: Response, next: NextFunction) =>
      handler(new ExpressRequest(req), new ExpressResponse(res), next),
    );
  }

  get(path: string, handler: HttpHandler): void {
    this.app.get(path, (req: Request, res: Response, next: NextFunction) =>
      handler(new ExpressRequest(req), new ExpressResponse(res), next),
    );
  }

  put(path: string, handler: HttpHandler): void {
    this.app.put(path, (req: Request, res: Response, next: NextFunction) =>
      handler(new ExpressRequest(req), new ExpressResponse(res), next),
    );
  }

  delete(path: string, handler: HttpHandler): void {
    this.app.delete(path, (req: Request, res: Response, next: NextFunction) =>
      handler(new ExpressRequest(req), new ExpressResponse(res), next),
    );
  }

  use(handler: HttpHandler): void {
    this.app.use((req: Request, res: Response, next: NextFunction) =>
      handler(new ExpressRequest(req), new ExpressResponse(res), next),
    );
  }

  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback);
  }
}
