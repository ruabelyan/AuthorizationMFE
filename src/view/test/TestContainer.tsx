import { testActions } from '@/adapter/redux/actions';
import { FC, useEffect } from 'react';
import { connect } from 'react-redux';

type TestActions = typeof testActions;

type TestContainerProps = {
  testProp: string;
} & TestActions;

const TestContainer: FC<TestContainerProps> = ({ test }) => {
  useEffect(() => {
    test();
  }, []);

  return <div>Test</div>;
};

export default connect<null, TestActions>(null, testActions)(TestContainer);
