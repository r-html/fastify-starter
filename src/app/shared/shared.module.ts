import { Module } from '@rhtml/di'

import { FailResponseFactory } from './helpers'

@Module({
  providers: [FailResponseFactory],
})
export class SharedModule {}
