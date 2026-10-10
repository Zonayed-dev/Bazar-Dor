
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryProductList from "@/components/product/CategoryProductList";

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
    params,
}: CategoryPageProps) {
    const { slug } = await params;

    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts(),
    ]);

    const category = categories.find((item) => item.slug === slug);

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
            </div>

            <CategoryProductList products={categoryProducts} />
        </main>
    );
}
