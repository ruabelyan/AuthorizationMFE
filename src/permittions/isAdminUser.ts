import { ParseIdTokenResponseModel } from '@atom/user-management';

export const isAdminUser = (user: ParseIdTokenResponseModel) => [1].includes(user.projectId);
