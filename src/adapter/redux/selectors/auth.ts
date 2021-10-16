import { createSelector } from 'reselect';
import { ReduxStore } from '../types';

export const selectAuth = (state: ReduxStore) => state.auth;

export const selectLoginLoading = createSelector(selectAuth, (auth) => auth.isLoading);
export const selectLoginErrorMessage = createSelector(selectAuth, (auth) => auth.loginErrorMessage);

