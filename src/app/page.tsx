
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { getProducts } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import bazarHero from "@/assets/bazar-hero.png";

async function HomeContent() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="bg-base-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 md:flex-row md:py-24">
          <div className="flex-1">
            <p className="mb-3 font-semibold text-success">
              আপনার নিত্যদিনের বাজার সঙ্গী
            </p>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              প্রতিদিনের বাজারদর,
              <span className="text-success"> এক নজরে</span>
            </h1>

            <p className="mt-5 max-w-xl text-base-content/70">
              চাল, ডাল, সবজি, মাছসহ নিত্যপ্রয়োজনীয় পণ্যের
              দাম জানুন সহজেই।
            </p>

            <Link
              href="#সব-পণ্য"
              className="btn btn-success mt-6"
            >
              সব পণ্য দেখুন →
            </Link>
          </div>

          <div className="relative w-full flex-1 overflow-hidden rounded-2xl">
            <Image
              src={bazarHero}
              alt="বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজার"
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Price risers */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-5 text-2xl font-bold">
          আজ দাম বেড়েছে ▲
        </h2>

        {risers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-base-content/60">
            এই মুহূর্তে দাম বাড়ার তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Price fallers */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-5 text-2xl font-bold">
          আজ দাম কমেছে ▼
        </h2>

        {fallers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-base-content/60">
            এই মুহূর্তে দাম কমার তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* All products */}
      <section
        id="সব-পণ্য"
        className="mx-auto max-w-6xl scroll-mt-6 px-4 py-10"
      >
        <h2 className="text-2xl font-bold">সব পণ্য</h2>

        <p className="mb-6 mt-2 text-base-content/60">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর দেখুন।
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-base-content/60">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-center">
            বাজারদর লোড হচ্ছে...
          </p>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}