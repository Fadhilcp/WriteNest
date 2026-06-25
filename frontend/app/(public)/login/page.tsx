"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/forms/AuthCard";
import { InputField } from "@/components/forms/AuthFormControls";
import { FormButton } from "@/components/ui/FormButton";
import authService from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/authSlice";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await authService.login(formData);
            const { user, accessToken } = response.data;

            dispatch(setCredentials({ accessToken, user }));
            router.push("/");
        } catch (error: any){
            setError(error?.response?.data?.message ?? "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

  return (
    <AuthCard
      title="Sign in"
      subtitle="Good to have you back."
      alternativeText="New here?"
      alternativeLinkText="Create an account"
      alternativeHref="/register"
      dividerText="or"
      error={error}
      loading={loading}
    >
      <form onSubmit={handleSubmit} noValidate>
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
          placeholder="••••••••"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <FormButton type="submit" loading={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </FormButton>
      </form>
    </AuthCard>
  );
}