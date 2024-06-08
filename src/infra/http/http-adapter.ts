export interface HttpRequest {
  body: any;
  params: any;
  query: any;
}

export interface HttpResponse {
  status(code: number): HttpResponse;
  json(data: any): void;
  setHeader(name: string, value: string): void;
}

export type HttpNextFunction = (err?: Error) => void;

export type HttpHandler = (
  req: HttpRequest,
  res: HttpResponse,
  next: HttpNextFunction,
) => void;

export interface HttpAdapter {
  post(path: string, handler: HttpHandler): void;
  get(path: string, handler: HttpHandler): void;
  put(path: string, handler: HttpHandler): void;
  delete(path: string, handler: HttpHandler): void;
  listen(port: number, callback: () => void): void;
}
