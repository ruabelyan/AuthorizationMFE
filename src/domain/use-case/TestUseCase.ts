import { inject, injectable } from 'inversify';
import { ITestRepository } from '../boundaries';

@injectable()
export class TestUseCase {
  @inject('ITestRepository')
  private readonly testRepository: ITestRepository;

  test() {
    return this.testRepository.test();
  }
}
