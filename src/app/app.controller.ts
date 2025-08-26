import { Controller, Route } from '@rhtml/fastify'

@Controller({
  route: '/',
})
export class AppController {
  @Route({
    method: 'GET',
  })
  status() {
    return { status: 'ok' }
  }
}
