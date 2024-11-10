import { createAction, props } from "@ngrx/store";
import { User } from "./auth.state";

export const credentialsLogin = createAction(
    '[Auth] Credentials Login Attempt',
    props<{ email: string, password: string }>()
);

export const credentialsRegistration = createAction(
    '[Auth] Credentials Registration Attempt'
);

export const credentialsReAuthentication = createAction(
    '[Auth] Credentials ReAuthentication attempt',
);

export const authenticated = createAction(
    '[Auth] Authenticated',
    props<{ user: User }>()
);

export const notAuthenticated = createAction(
    '[Auth] Not Authenticated'
);

export const authError = createAction(
    '[Auth] Error',
    props<{ error: any }>()
);

export const logout = createAction(
    '[Auth] Logout'
);

export const getUser = createAction(
    '[Auth] Get User',
);
