export interface LoginContext {
    email: string,
    password: string,
    showPassword: boolean,
    error: string,
    isLoading: boolean,
    isLoggedIn: boolean
}