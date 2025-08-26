import { Module } from '@rhtml/di'
import { FastifyModule } from '@rhtml/fastify'
import fastify from 'fastify'

@Module({
  imports: [FastifyModule.forRoot(fastify, {})],
})
export class TestingModule {}
