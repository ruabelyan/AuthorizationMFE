import { classes } from '@automapper/classes';
import autoMapper from '@automapper/core';
import { baseProfile } from './profile';

export const mapper = autoMapper
  .createMapper({
    name: 'AuthMapper',
    pluginInitializer: classes,
    namingConventions: new autoMapper.CamelCaseNamingConvention()
  })
  .addProfile(baseProfile);
