import '@abraham/reflection'

import { exit } from 'node:process'

import { Bootstrap } from '@rhtml/di'

import { AppModule } from './app/app.module'

Bootstrap(AppModule)
  .then(() => console.log('App Started'))
  .catch(err => {
    console.error(err)
    exit(1)
  })
