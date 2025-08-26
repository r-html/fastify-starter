import { UserRoles } from '@shared/enums'
import { UserAuthInfo } from '@shared/types'

export const getMockedUser = (
  overrides?: Partial<UserAuthInfo>
): UserAuthInfo => ({
  id: 'testUserId',
  account_id: 'testAccountId',
  account_type: UserRoles.ADMIN,
  cognito_id: 'testCognitoId',
  first_name: 'Test',
  last_name: 'User',
  user_email: 'testuser@email.com',
  permissions: [UserRoles.ADMIN],
  ...overrides,
})
export const isUnitTest = () => !!process.env.JEST_WORKER_ID
