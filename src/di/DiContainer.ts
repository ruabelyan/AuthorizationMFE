import { asyncForeach } from '@atom/shared';
import { Container } from 'inversify';

export type DiConfig = {
  modulePath: string;
  moduleName: string;
};

export class DiContainer {
  public diContainer: Container;

  public configure = async (diConfigs: DiConfig[]) => {
    this.diContainer = new Container({
      defaultScope: 'Singleton'
    });

    await asyncForeach(diConfigs, async ({ moduleName, modulePath }) => {
      const module = await import(`../${modulePath}`);

      this.diContainer.bind(`I${moduleName}`).to(module[moduleName]);
      this.diContainer.bind(moduleName).to(module[moduleName]);
    });
  };
}
