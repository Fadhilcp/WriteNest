"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/forms/AuthCard";
import { InputField } from "@/components/forms/AuthFormControls";
import { FormButton } from "@/components/ui/FormButton";
import authService from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/authSlice";

export default function RegisterPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);


        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await authService.register(formData);
            const { user, accessToken } = response.data;

            dispatch(setCredentials({ accessToken, user }));
            router.push("/");
        } catch (error: any){
            setError(error?.response?.data?.message ?? "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard
            title="Create account"
            subtitle="Your words deserve a home."
            alternativeText="Already have one?"
            alternativeLinkText="Sign in"
            alternativeHref="/login"
            dividerText="or sign up with email"
            error={error}
            loading={loading}
            showLegalText={true}
        >
            <form onSubmit={handleSubmit} noValidate>
                <InputField
                    id="name"
                    name="name"
                    label="Full name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <InputField
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <InputField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <InputField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <FormButton type="submit" loading={loading}>
                    {loading ? "Creating account…" : "Create account"}
                </FormButton>
            </form>
        </AuthCard>
    );
}