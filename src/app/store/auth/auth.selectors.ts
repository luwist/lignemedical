import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AuthState } from "./auth.state";

export const selectAuth = (state: AppState) => state.auth;

export const selectUser = createSelector(
    selectAuth,
    (state: AuthState) => state.user
);

export const selectIsUserLogged = createSelector(
    selectAuth,
    (state: AuthState) => state.loggedIn
  );