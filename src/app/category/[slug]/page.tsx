
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  let categories;
  let products;

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch {
    throw new Error("Failed to load category data.");
  }

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === category.slug
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <Link href="/" className="link link-hover text-sm">
        ← হোম পেজ
      </Link>

      <div className="mb-8 mt-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>

          <h1 className="text-3xl font-bold">
            {category.nameBn}
          </h1>
        </div>

        <p className="mt-2 text-base-content/70">
          {category.nameBn} বিভাগের আজকের বাজারদর।
        </p>

        <p className="mt-2 text-sm text-base-content/60">
          মোট পণ্য:{" "}
          {new Intl.NumberFormat("bn-BD").format(
            categoryProducts.length
          )}
        </p>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="rounded-xl border border-base-300 p-10 text-center">
          <h2 className="text-xl font-semibold">
            এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
          </h2>

          <Link href="/" className="btn btn-success mt-5">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}
