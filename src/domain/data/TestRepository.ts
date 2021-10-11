import { injectable } from 'inversify';
import { ITestRepository } from '../boundaries';
import { TestEntity } from '../entities';

@injectable()
export class TestRepository implements ITestRepository {
  test() {
    const entity = new TestEntity({ test: 'test' });
  }
}
