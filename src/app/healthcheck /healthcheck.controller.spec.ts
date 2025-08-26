import { Bootstrap, get, Module } from '@rhtml/di'
import { TestingModule } from '@shared/test'

import { HealthCheckController } from './healthcheck.controller'
import { HealthCheckService } from './healthcheck.service'
import { HealthCheckStatus } from './types'

describe('healthcheck controller', () => {
  let healthCheckController: HealthCheckController
  let healthCheckService: HealthCheckService

  beforeEach(async () => {
    @Module({
      imports: [TestingModule],
      providers: [HealthCheckService],
      bootstrap: [HealthCheckController],
    })
    class AppModule {}

    await Bootstrap(AppModule)
    healthCheckController = get(HealthCheckController)
    healthCheckService = get(HealthCheckService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should be defined', () => {
    expect(healthCheckController).toBeDefined()
  })

  it('should call the healthcheck service', async () => {
    const response = {
      server: { status: HealthCheckStatus.WORKING },
      database: { status: 'ok' },
    } as never
    const spy = jest
      .spyOn(healthCheckService, 'checkServicesStatus')
      .mockResolvedValue(response)
    const result = await healthCheckController.healthCheck()
    expect(spy).toHaveBeenCalled()
    expect(result).toEqual(response)
  })
})
