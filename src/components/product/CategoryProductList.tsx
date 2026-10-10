
"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";

type SortOption = "default" | "low-high" | "high-low";

type CategoryProductListProps = {
  products: Product[];
};

export default function CategoryProductList({
  products,
}: CategoryProductListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "low-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortBy === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortBy]);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-base-content/70">
          মোট পণ্য:{" "}
          {new Intl.NumberFormat("bn-BD").format(sortedProducts.length)}
        </p>

        <label className="flex items-center gap-3">
          <span className="whitespace-nowrap text-sm font-medium">
            দাম অনুযায়ী সাজান
          </span>

          <select
            className="select select-bordered w-full sm:w-52"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">কম দাম থেকে বেশি</option>
            <option value="high-low">বেশি দাম থেকে কম</option>
          </select>
        </label>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-base-300 p-10 text-center">
          <h2 className="text-xl font-semibold">
            এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
