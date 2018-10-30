import { Request } from 'koa'

declare module 'koa' {
  interface BaseContext {
    request: Request;
  }
}
