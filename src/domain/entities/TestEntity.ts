export interface Test {
  test: string;
}

export class TestEntity {
  constructor(public test: Test) {}
}
