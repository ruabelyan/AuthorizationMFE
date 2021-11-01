import createStore from '../store';

export type ReduxStore = ReturnType<ReturnType<typeof createStore>['getState']>;
