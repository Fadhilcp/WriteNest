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
    const dispatch = useDispatch();

    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otp, setOtp] = useState("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            console.log('')
            await authService.register(formData);

            setSuccessMessage("OTP sent successfully. Please check your email.");
            setStep(2);
        } catch (error: any){
            setError(error?.response?.data?.message ?? "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        if(otp.length !== 6){
            setError("Please enter a valid 6-digit OTP");
            setLoading(false);
            return;
        }

        try {
            const response = await authService.verifyRegister({
                email: formData.email,
                otp: otp
            });

            const { user, accessToken } = response.data;

            dispatch(setCredentials({ user, accessToken }));
            router.push("/")
        } catch (error: any) {
            setError(error?.response?.data?.message ?? "Invalid or expired OTP.");
        } finally {
            setLoading(false);
        }
    }

    const cardProps = step === 1 
        ? {
            title: "Create account",
            subtitle: "Your words deserve a home.",
            alternativeText: "Already have one?",
            alternativeLinkText: "Sign in",
            alternativeHref: "/login",
            dividerText: "or sign up with email",
            showLegalText: true,
        }
        : {
            title: "Verify your email",
            subtitle: `We sent a code to ${formData.email}`,
            dividerText: "enter 6-digit code",
            showLegalText: false,
        };

    return (
        <AuthCard
            {...cardProps}
            error={error}
            loading={loading}
        >
            {successMessage && (
                <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-[13px] text-green-700 border border-green-200">
                    {successMessage}
                </p>
            )}

            {step === 1 ? (
                <form onSubmit={handleRegisterSubmit} noValidate>
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
                        {loading ? "Sending code…" : "Create account"}
                    </FormButton>
                </form>
            ) : (
                <form onSubmit={handleVerifySubmit} noValidate>
                    <InputField
                        id="otp"
                        name="otp"
                        label="Authentication Code"
                        type="text"
                        placeholder="123456"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        required
                    />

                    <FormButton type="submit" loading={loading}>
                        {loading ? "Verifying…" : "Verify and Login"}
                    </FormButton>
                    
                    <div className="mt-4 text-center">
                        <button 
                            type="button"
                            onClick={() => {
                                setStep(1);
                                setSuccessMessage(null);
                                setError(null);
                            }}
                            className="text-[13px] text-accent-warm hover:underline"
                        >
                            Change email address
                        </button>
                    </div>
                </form>
            )}
        </AuthCard>
    );
}