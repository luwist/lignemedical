import { createReducer, on } from "@ngrx/store";
import { authenticated, authError, getUser } from "./auth.actions";
import { AuthState } from "./auth.state";

const initialState: AuthState = {
    loggedIn: false,
    user: null,
    loading: true,
    error: null,
}

export const authReducer = createReducer(
    initialState,
    on(getUser, (state) => {
        return {
            ...state,
            user: state.user,
            loading: false,
            loggedIn: true
        }
    }),
    on(authenticated, (state, action) => {
        return {
            ...state,
            user: action.user,
            loading: false,
            loggedIn: true
        }
    }),
    on(authError, (state, action) => {
        return {
            ...state,
            loading: false,
            error: {
                code: action.error.code,
                message: action.error.message
            }
        }
    })
)