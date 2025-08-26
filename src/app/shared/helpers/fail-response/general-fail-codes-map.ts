import { IFailResponse } from './fail-response'

type FailCodesIndex = 'ENTITY_VALIDATION_FAILED' | 'INTERNAL_SERVER_ERROR'

export const GeneralFailCodesMap: { [key in FailCodesIndex]: IFailResponse } = {
  ENTITY_VALIDATION_FAILED: {
    statusCode: 422,
    message: 'Entity validation failed',
    code: 'ENTITY_VALIDATION_FAILED',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
  },
}
