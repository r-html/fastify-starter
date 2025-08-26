import { Middleware } from '@rhtml/fastify'
import { RouteOptions } from 'fastify'

export interface PrintRoutesMiddlewareOptions {
  printRoutes?: boolean
}

export const PrintRoutesMiddleware =
  ({ printRoutes = true }: PrintRoutesMiddlewareOptions): Middleware =>
  fastify => {
    const routeOptions: RouteOptions[] = []
    fastify.addHook('onRoute', routeOption => {
      routeOptions.push(routeOption)
    })

    fastify.addHook('onReady', done => {
      if (printRoutes) {
        printRoutesToTerminal(routeOptions)
      }
      return done()
    })

    return fastify
  }

enum COLORS {
  yellow = 33,
  green = 32,
  blue = 34,
  red = 31,
  grey = 90,
  magenta = 35,
  clear = 39,
}

const colorText = (color: COLORS, string: string) =>
  `\u001b[${color}m${string}\u001b[${COLORS.clear}m`

function colorMethod(method: string) {
  switch (method) {
    case 'POST':
      return colorText(COLORS.yellow, method)
    case 'GET':
      return colorText(COLORS.green, method)
    case 'PUT':
      return colorText(COLORS.blue, method)
    case 'DELETE':
      return colorText(COLORS.red, method)
    case 'PATCH':
      return colorText(COLORS.grey, method)
    default:
      return method
  }
}

function printRoutesToTerminal(routeOptions: RouteOptions[]) {
  for (const route of routeOptions) {
    const method = route.method as string
    if (method === 'HEAD') {
      continue
    }
    console.info(`${colorMethod(method)}\t${route.url}`)
  }
}
