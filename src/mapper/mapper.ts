import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, createMapper } from '@automapper/core';
import { baseProfile } from './profile';

export const mapper = createMapper({
  name: 'AuthMapper',
  pluginInitializer: classes,
  namingConventions: new CamelCaseNamingConvention()
}).addProfile(baseProfile);
