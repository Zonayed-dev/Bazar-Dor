"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    setError("");

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Social sign-in failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  async function handleSignin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Sign-in failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSignin}
        className="card w-full max-w-md bg-base-100 p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <label className="form-control mb-4">
          <span className="label-text mb-2">Email</span>
          <input
            className="input input-bordered w-full"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="form-control mb-4">
          <span className="label-text mb-2">Password</span>
          <input
            className="input input-bordered w-full"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && (
          <p role="alert" className="mb-4 text-sm text-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-success w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="divider">OR</div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => handleSocialSignIn("google")}
          >
            Continue with Google
          </button>

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => handleSocialSignIn("github")}
          >
            Continue with GitHub
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="link link-success">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}