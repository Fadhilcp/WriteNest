import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    accessToken: string | null;
    user: User | null;
    isInitialized: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isInitialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ accessToken: string; user: User; }>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },

        clearCredentials: (state) => {
            state.accessToken = null;
            state.user = null;
        },

        setInitialized: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isInitialized = action.payload;
        },
    },
});

export const { setCredentials, clearCredentials, setInitialized } = authSlice.actions;
export default authSlice.reducer;