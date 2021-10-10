import 'reflect-metadata';
import { DiContainer } from './di';
import { TestUseCase } from './domain/use-case';

const containerInstance = new DiContainer();

containerInstance.configure(diFiles).then(() => {
  const testUseCase = containerInstance.diContainer.get<TestUseCase>('TestUseCase');

  testUseCase.test();
});
