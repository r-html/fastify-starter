import { randomUUID } from 'crypto'

import { IResponse, Response } from './response'

export interface IErrorObject {
  message: string
}

export interface IFailResponse extends IResponse {
  errors?: IErrorObject[]
}

export class FailResponse extends Response implements IFailResponse {
  public errors?: (IErrorObject | IFailResponse)[]
  public uuid: string = this.generateUniqueUUID()
  constructor(
    code: string,
    message: string,
    statusCode: number,
    errors?: IErrorObject[]
  ) {
    super(code, message, statusCode)
    this.errors = errors
    if (statusCode < 400 || statusCode > 511) {
      this.statusCode = 500
    } else {
      this.statusCode = statusCode
    }
  }

  /**
   * Generates an random unique ID used for track requests that fail
   */
  private generateUniqueUUID() {
    return [randomUUID(), randomUUID()].join('-')
  }
}
