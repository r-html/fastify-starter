import { CoreModule } from '@core/core.module'
import { Module } from '@rhtml/di'
import { SharedModule } from '@shared/shared.module'

import { AppController } from './app.controller'
import { HealthCheckModule } from './healthcheck '

@Module({
  imports: [CoreModule, SharedModule, HealthCheckModule],
  bootstrap: [AppController],
})
export class AppModule {}
