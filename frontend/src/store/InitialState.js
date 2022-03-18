// APP Initia State
export const initialState = {
    // Authenticated user
    session: {},
    // Adverts in the app
    adverts: [],
    // UI State
    ui: {
        error: null,
        isAuthenticating: false,
        isFetching: false,
        isUpdating: false,
        isCreating: false,
        isDeleting: false,
        currentPage: 0,
    }
}