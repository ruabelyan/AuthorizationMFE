import { ParseIdTokenResponseModel } from '@atom/user-management';

export const isAdminUser = (user: ParseIdTokenResponseModel) => [2].includes(user.projectId);
