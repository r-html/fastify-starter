export const ENVIRONMENT = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  HOST: process.env.HOST ? process.env.HOST : '0.0.0.0',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
}

export const isCloud = () => process.env.NODE_ENV === 'cloud'
