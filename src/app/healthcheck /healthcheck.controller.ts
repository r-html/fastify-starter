import { Controller, Route } from '@rhtml/fastify'

import { HealthCheckService } from './healthcheck.service'
import { HealthCheckResponse } from './types'

@Controller({
  route: '/healthcheck',
})
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  @Route({
    method: 'GET',
    url: '/',
  })
  healthCheck(): HealthCheckResponse {
    return this.healthCheckService.checkServicesStatus()
  }

  @Route({
    method: 'GET',
    url: '/status',
  })
  healthCheckAnotherRoute(): HealthCheckResponse {
    return this.healthCheckService.checkServicesStatus()
  }
}
