import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
} as {
    token?: string | null;
    userId?: string | null;
    login?: (jwtToken?: string, id?: string) => any;
    logout: () => any;
    isAuthenticated?: boolean;
});
