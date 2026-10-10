
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="flex gap-2">
        <span className="loading loading-spinner loading-sm" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          Hi, {session.user.name}
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-outline btn-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/signin" className="btn btn-outline btn-sm">
        Sign In
      </Link>

      <Link href="/signup" className="btn btn-primary btn-sm">
        Sign Up
      </Link>
    </div>
  );
}