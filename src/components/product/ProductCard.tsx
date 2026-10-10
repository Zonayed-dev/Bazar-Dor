import Link from "next/link";
import type { Product } from "@/lib/api";

const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
};

const money = (value: number) =>
    new Intl.NumberFormat("bn-BD").format(value);

export default function ProductCard({
    product,
}: {
    product: Product;
}) {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    return (
        <Link
            href={`/product/${product.slug}`}
            className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
            <div className="card-body p-4">
                <div className="flex items-start justify-between">
                    <span className="text-4xl">{product.image}</span>

                    <span
                        className={`badge ${isUp
                                ? "badge-error"
                                : isDown
                                    ? "badge-success"
                                    : "badge-ghost"
                            }`}
                    >
                        {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                        {money(Math.abs(product.change.pct))}%
                    </span>
                </div>

                <p className="text-sm text-base-content/60">
                    {product.categoryNameBn}
                </p>

                <h2 className="text-lg font-bold">
                    {product.nameBn}
                </h2>

                <p className="text-sm text-base-content/60">
                    {units[product.unit] ?? `প্রতি ${product.unit}`}
                </p>

                <div className="mt-2 border-t border-base-300 pt-3">
                    <p className="text-sm text-base-content/60">
                        আজকের দাম
                    </p>
                    <p className="text-xl font-bold text-success">
                        {money(product.today)} টাকা
                    </p>
                </div>
            </div>
        </Link>
    );
}