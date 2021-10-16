import { asyncForeach } from '@atom/common';
import { Container } from 'inversify';

export type DiConfig = {
  modulePath: string;
  moduleName: string;
};

export type DiFiles = {
  module: any;
  name: string;
};

export class DiContainer {
  public diContainer: Container;
  public diFiles: DiFiles[] = [];

  public configure = async (diConfigs: DiConfig[]) => {
    this.diContainer = new Container({
      defaultScope: 'Singleton'
    });

    await asyncForeach(diConfigs, async ({ moduleName, modulePath }) => {
      const module = await import(`../${modulePath}`);

      this.diContainer.bind(`I${moduleName}`).to(module[moduleName]);
      this.diContainer.bind(moduleName).to(module[moduleName]);

      this.diFiles.push({ name: moduleName, module: module });
    });
  };
}
