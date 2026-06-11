"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loading from "../ui/Loading";

export default function ProtectedRoute({ children}: { children: React.ReactNode }) {
    const router = useRouter();

    const { user, isInitialized } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isInitialized && !user) {
            router.replace("/login");
        }
    }, [isInitialized, user, router]);

    if (!isInitialized) return <Loading fullscreen label="Loading…" />;

    if (!user) return null;

    return <>{children}</>;
}