const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

export type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
};

export type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return Array.isArray(data) ? data : data.products;
}

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/categories`);

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    return Array.isArray(data) ? data : data.categories;
}


export async function getProductBySlug(
    slug: string
): Promise<Product | null> {
    const products = await getProducts();
    const listedProduct = products.find(
        (product) => product.slug === slug
    );

    if (!listedProduct) {
        return null;
    }

    const res = await fetch(
        `${BASE_URL}/products/${listedProduct.id}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product details");
    }

    const data = await res.json();
    const product = data.product ?? data.data ?? data;

    if (!product || typeof product !== "object") {
        throw new Error("Invalid product response");
    }

    return {
        ...listedProduct,
        ...product,
        markets: Array.isArray(product.markets)
            ? product.markets
            : listedProduct.markets ?? [],
    } as Product;
}
