"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { clearCredentials, setCredentials, setInitialized } from "@/redux/authSlice";
import authService from "@/services/auth.service";
import { RootState } from "@/redux/store";
import Loading from "../ui/Loading";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const isInitialized = useSelector((state: RootState) => state.auth.isInitialized);
    const user = useSelector((state: RootState) => state.auth.user);

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

    useEffect(() => {
        if (!isInitialized) return;

        const isAuthPage = pathname === "/login" || pathname === "/register";
        const isPrivateRoute = pathname.startsWith("/my-posts") || pathname.startsWith("/dashboard");

        if (user && isAuthPage) {
            router.push("/");
        }

        if (!user && isPrivateRoute) {
            router.push("/login");
        }
    }, [isInitialized, user, pathname, router]);

    if (!isInitialized) return <Loading fullscreen label="Loading…" />;

    return <>{children}</>;
}