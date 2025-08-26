import { Module } from '@rhtml/di'

import { HealthCheckController } from './healthcheck.controller'
import { HealthCheckService } from './healthcheck.service'

@Module({
  providers: [HealthCheckService],
  bootstrap: [HealthCheckController],
})
export class HealthCheckModule {}
