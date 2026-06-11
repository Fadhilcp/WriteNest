"use client";

import { useEffect, useState } from "react";
import { clearCredentials } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import authService from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isMounted, setIsMounted] = useState(false);

    const user = useSelector((state: RootState) => state.auth.user);
    const isLoggedIn = !!user;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSignOut = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(clearCredentials());
            router.push("/");
        }
    };

    return (
        <nav className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-border bg-surface px-8">
            {/* Logo */}
            <Link
                href="/"
                className="font-serif text-xl font-semibold tracking-tight text-ink no-underline"
            >
                Write<span className="text-accent-warm">Nest</span>
            </Link>

            {/* Navigation Actions */}
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    className="rounded-md bg-transparent px-[14px] py-[6px] text-[13px] font-normal text-ink-mid transition-all duration-150 no-underline hover:bg-surface-alt hover:text-ink"
                >
                    Explore
                </Link>

                {!isMounted ? (
                    // Optional Loading Skeleton or Null Placeholder to match initial layout structure
                    <div className="w-[140px]"/> 
                ) : isLoggedIn ? (
                    <>
                        <Link
                            href="/my-posts"
                            className="rounded-md bg-transparent px-[14px] py-[6px] text-[13px] font-normal text-ink-mid transition-all duration-150 no-underline hover:bg-surface-alt hover:text-ink"
                        >
                            My Posts
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="cursor-pointer rounded-lg border border-border bg-transparent px-[18px] py-[7px] text-[13px] font-medium text-ink transition-all duration-150 hover:bg-surface-alt"
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="rounded-md bg-transparent px-[14px] py-[6px] text-[13px] font-normal text-ink-mid transition-all duration-150 no-underline hover:bg-surface-alt hover:text-ink"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/register"
                            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-ink px-6 py-[10px] text-[14px] font-medium leading-none text-surface no-underline transition-opacity duration-150 hover:opacity-85"
                        >
                            Get started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}