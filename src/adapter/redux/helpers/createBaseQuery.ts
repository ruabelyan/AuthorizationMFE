import { containerInstance } from '@/di';
import { getBaseQuery } from '@atom/common';

// @ts-ignore
export const createBaseQuery = getBaseQuery(containerInstance);
