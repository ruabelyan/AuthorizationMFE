import { containerInstance } from '@/di';
import { getBaseQuery } from '@atom/common';

export const createBaseQuery = getBaseQuery(containerInstance);
