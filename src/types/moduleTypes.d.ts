// to make the file a module
export {};

declare global {
  namespace Express {
    export interface Response {
      formatResponse: (data: unknown, statusCode?: number, customObject?: object) => unknown;
    }
  }
}
