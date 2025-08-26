import { Injectable } from '@rhtml/di'

import { HealthCheckStatus } from './types'

@Injectable()
export class HealthCheckService {
  checkServicesStatus() {
    return {
      server: {
        status: HealthCheckStatus.WORKING,
      },
    }
  }
}
