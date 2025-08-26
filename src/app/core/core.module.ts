import cors, { FastifyCorsOptions } from '@fastify/cors'
import fastifyMiddie from '@fastify/middie'
import { fastifyRequestContext } from '@fastify/request-context'
import { Module, set } from '@rhtml/di'
import { FastifyModule } from '@rhtml/fastify'
import { FailResponseFactory } from '@shared/helpers'
import fastify from 'fastify'
import pino from 'pino'

import { ENVIRONMENT, isCloud } from '~app/app.constants'

import { PrintRoutesMiddleware } from './middlewares'

@Module({
  imports: [
    FastifyModule.forRoot(fastify, {
      server: {
        port: ENVIRONMENT.PORT,
        host: ENVIRONMENT.HOST,
      },
      loggerInstance: pino({
        level: ENVIRONMENT.LOG_LEVEL,
        transport: !isCloud()
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            }
          : undefined,
      }) as never,
      plugins: [
        {
          module: fastifyRequestContext,
        },
        {
          module: fastifyMiddie,
          options: {
            hook: 'preHandler',
          },
        },
        {
          module: cors,
          options: {
            origin: '*',
            credentials: true,
            allowedHeaders:
              'Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Slug, X-UID',
            methods: 'OPTIONS, POST, PUT, PATCH, GET, DELETE',
          } as FastifyCorsOptions,
        },
      ],
      middlewares: [PrintRoutesMiddleware({ printRoutes: true })],
      globalErrorHandler: instance => (error, request, reply) => {
        /* When we have uuid provided it means we are executing custom error handler FailResponseFactory > FailResponse */
        const isCustomError = error['uuid']
        const isJsonSchemaValidationError =
          error['validation'] && error['validationContext']
        const isResponseSerializationValidationError = error['serialization']

        if (isResponseSerializationValidationError) {
          error.statusCode = 422
        }

        if (
          isCustomError ||
          isJsonSchemaValidationError ||
          isResponseSerializationValidationError
        ) {
          instance.log.error({
            error,
            stackTrace: JSON.stringify(
              error,
              Object.getOwnPropertyNames(error)
            ),
          })
          return reply.status(Number(error.statusCode)).send(error)
        }

        const unhandledError = set(FailResponseFactory).createGenericError(
          [
            'If you see this error usally means that there is an unhandled rejection inside the code.',
            'Using the uuid provided the error can be tracked inside internal logs of the service',
          ].join(' ')
        )
        instance.log.error({
          unhandledError,
          stackTrace: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        })
        return reply.status(500).send(unhandledError)
      },
    }),
  ],
})
export class CoreModule {}
