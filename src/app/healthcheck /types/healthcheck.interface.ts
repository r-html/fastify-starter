export enum HealthCheckStatus {
  WORKING = 'working',
  NOT_AVAILABLE = 'not_available',
}

export interface StatusType<T> {
  status: T
}

export interface HealthCheckResponse {
  server: StatusType<HealthCheckStatus>
}
