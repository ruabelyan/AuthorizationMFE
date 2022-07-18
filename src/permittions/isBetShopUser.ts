import { ParseIdTokenResponseModel } from '@atom/user-management';

export const isBetShopUser = (user: ParseIdTokenResponseModel) => [3].includes(user.projectId);
