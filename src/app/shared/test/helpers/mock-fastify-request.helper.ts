import { ServiceClient } from '@shared/models'
import { FastifyRequest, RouteGenericInterface } from 'fastify'

type ReturnResponse<T extends RouteGenericInterface> = FastifyRequest<T> & {
  context: { client: ServiceClient }
}

export function createMockFastifyRequest<
  T extends RouteGenericInterface,
>(options: {
  params?: T['Params']
  body?: T['Body']
  headers?: T['Headers']
  query?: T['Querystring']
}): ReturnResponse<T> {
  return {
    params: options.params || {},
    body: options.body || {},
    headers: options.headers || {},
    query: options.query || {},
    context: {
      client: {
        _id: '1234',
      } as never as ServiceClient,
    },
  } as ReturnResponse<T>
}
