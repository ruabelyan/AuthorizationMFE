export class TestEntity {
  private test: string;

  static init() {
    return new TestEntity();
  }

  getTest() {
    return this.test;
  }

  add(newTest: string) {
    this.test = newTest;
  }
}
