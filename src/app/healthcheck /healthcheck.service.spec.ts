import { Bootstrap, Module, set } from '@rhtml/di'

import { HealthCheckService } from './healthcheck.service'
import { HealthCheckStatus } from './types'

describe('health check service', () => {
  let healthCheckService: HealthCheckService

  beforeEach(async () => {
    @Module({
      providers: [HealthCheckService],
    })
    class AppModule {}

    await Bootstrap(AppModule)

    healthCheckService = set(HealthCheckService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return WORKING status for the server', () => {
    const response = {
      server: {
        status: HealthCheckStatus.WORKING,
      },
    } as never

    const result = healthCheckService.checkServicesStatus()

    expect(result).toEqual(response)
  })
})
