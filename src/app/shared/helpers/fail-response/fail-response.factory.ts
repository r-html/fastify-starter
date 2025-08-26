import { Injectable } from '@rhtml/di'

import { FailResponse, IErrorObject, IFailResponse } from './fail-response'
import { GeneralFailCodesMap } from './general-fail-codes-map'

@Injectable()
export class FailResponseFactory {
  public create(
    errorTemplate: IFailResponse,
    errors?: IErrorObject[]
  ): FailResponse {
    const { code, message, statusCode } = errorTemplate

    return new FailResponse(code, message, statusCode, errors)
  }

  public createGenericError(customErrorMessage?: string): FailResponse {
    const { code, message, statusCode } =
      GeneralFailCodesMap.INTERNAL_SERVER_ERROR as IFailResponse
    const errors = [{ message: customErrorMessage || message }]

    return new FailResponse(code, message, statusCode, errors)
  }
}
