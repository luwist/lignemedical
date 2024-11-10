import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "./auth/auth.reducers";
import { AuthState } from "./auth/auth.state";

export interface AppState {
    auth: AuthState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    auth: authReducer
}