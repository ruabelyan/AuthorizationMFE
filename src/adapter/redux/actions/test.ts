import { InferValueTypes } from '../types';

const MODULE_NAME = 'TEST';

export const testTypes = {
  TEST: `${MODULE_NAME}/TEST`
} as const;

export const testActions = {
  test: () => ({
    type: testTypes.TEST
  })
};

export type TestActions = ReturnType<InferValueTypes<typeof testActions>>;
