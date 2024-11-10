export interface User {
    uid: string;
    emailVerified: boolean;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

interface Error {
    code: string;
    message: string;
}

export interface AuthState {
    loggedIn: boolean;
    user: User | null;
    loading: boolean;
    error: Error | null
}