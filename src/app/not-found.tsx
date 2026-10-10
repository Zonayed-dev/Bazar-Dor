
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl">🔎</span>

      <h1 className="mt-5 text-3xl font-bold">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-3 text-base-content/70">
        আপনি যে পেজটি খুঁজছেন সেটি এখানে নেই।
      </p>

      <Link href="/" className="btn btn-success mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
