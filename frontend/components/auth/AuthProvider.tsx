"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, setCredentials, setInitialized } from "@/redux/authSlice";
import authService from "@/services/auth.service";
import { RootState } from "@/redux/store";
import Loading from "../ui/Loading";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    const isInitialized = useSelector((state: RootState) => state.auth.isInitialized);

    useEffect(() => {
        const initialize = async () => {
            try {
                const response = await authService.refresh();

                const { accessToken, user } = response.data;

                dispatch(setCredentials({ accessToken, user }));
            } catch {
                dispatch(clearCredentials());
            } finally {
                dispatch(setInitialized(true));
            }
        };
        initialize();
    }, [dispatch]);

    if (!isInitialized) return <Loading fullscreen label="Loading…" />;

    return <>{children}</>;
}