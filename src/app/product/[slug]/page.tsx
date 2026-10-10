
import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";

export const instant = false;

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

const money = (value: number) =>
    new Intl.NumberFormat("bn-BD").format(value);

const getUnit = (unit: string) => {
    const units: Record<string, string> = {
        kg: "প্রতি কেজি",
        liter: "প্রতি লিটার",
        litre: "প্রতি লিটার",
        dozen: "প্রতি ডজন",
        piece: "প্রতি পিস",
    };

    return units[unit] ?? `প্রতি ${unit}`;
};

export default async function ProductPage({
    params,
}: ProductPageProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    console.log("Product page session:", session);

    if (!session) {
        redirect("/signin");
    }

    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const markets = product.markets ?? [];

    const minPrice =
        markets.length > 0
            ? Math.min(...markets.map((market) => market.min))
            : product.today;

    const maxPrice =
        markets.length > 0
            ? Math.max(...markets.map((market) => market.max))
            : product.today;

    const averagePrice =
        markets.length > 0
            ? Math.round(
                markets.reduce(
                    (sum, market) =>
                        sum + (market.min + market.max) / 2,
                    0
                ) / markets.length
            )
            : product.today;

    return (
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
            <Link href="/" className="link link-hover text-sm">
                ← হোম পেজ
            </Link>

            <section className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-6xl">
                        {product.image}
                    </div>

                    <div>
                        <p className="text-sm text-base-content/60">
                            {product.categoryNameBn}
                        </p>

                        <h1 className="mt-1 text-3xl font-bold">
                            {product.nameBn}
                        </h1>

                        <p className="mt-2 text-base-content/70">
                            বিভিন্ন বাজারে {product.nameBn} এর আজকের দাম।
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="badge badge-outline">
                                {product.categoryNameBn}
                            </span>

                            <span className="badge badge-outline">
                                {getUnit(product.unit)}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-8">
                <h2 className="mb-4 text-2xl font-bold">
                    আজকের দামের সারসংক্ষেপ
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-base-300 p-5">
                        <p className="text-sm text-base-content/60">
                            সর্বনিম্ন দাম
                        </p>
                        <p className="mt-2 text-2xl font-bold text-success">
                            {money(minPrice)} টাকা
                        </p>
                    </div>

                    <div className="rounded-xl border border-base-300 p-5">
                        <p className="text-sm text-base-content/60">
                            সর্বোচ্চ দাম
                        </p>
                        <p className="mt-2 text-2xl font-bold text-error">
                            {money(maxPrice)} টাকা
                        </p>
                    </div>

                    <div className="rounded-xl border border-base-300 p-5">
                        <p className="text-sm text-base-content/60">
                            গড় দাম
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                            {money(averagePrice)} টাকা
                        </p>
                    </div>
                </div>

                <p className="mt-3 text-xs text-base-content/60">
                    গড় দাম বাজারগুলোর সর্বনিম্ন ও সর্বোচ্চ দামের
                    মধ্যবিন্দুর গড় হিসেবে হিসাব করা হয়েছে।
                </p>
            </section>

            <section className="mt-10">
                <h2 className="mb-2 text-2xl font-bold">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                <p className="mb-5 text-base-content/70">
                    বাজার অনুযায়ী দামের তুলনা করুন।
                </p>

                {markets.length === 0 ? (
                    <div className="rounded-xl border border-base-300 p-8 text-center">
                        <p className="text-base-content/70">
                            এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-base-300">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>বাজার</th>
                                    <th>বিভাগ</th>
                                    <th>সর্বনিম্ন দাম</th>
                                    <th>সর্বোচ্চ দাম</th>
                                </tr>
                            </thead>

                            <tbody>
                                {markets.map((market, index) => (
                                    <tr
                                        key={`${market.market}-${market.division}-${index}`}
                                    >
                                        <td className="font-medium">
                                            {market.market}
                                        </td>
                                        <td>{market.division}</td>
                                        <td>{money(market.min)} টাকা</td>
                                        <td>{money(market.max)} টাকা</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}
