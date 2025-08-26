export interface IResponse {
  code: string
  message: string
  statusCode: number
}

export class Response implements IResponse {
  public code: string
  public message: string
  public statusCode: number

  constructor(code: string, message: string, statusCode: number) {
    this.code = code
    this.message = message
    this.statusCode = statusCode
  }
}
