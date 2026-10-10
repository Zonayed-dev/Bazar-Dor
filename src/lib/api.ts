
const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

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

async function fetchJson(path: string) {
    const response = await fetch(`${BASE_URL}${path}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${path} (${response.status})`);
    }

    return response.json();
}

export async function getCategories(): Promise<Category[]> {
    const data = await fetchJson("/categories");
    const categories = data.categories ?? data.data ?? data;

    if (!Array.isArray(categories)) {
        throw new Error("Invalid categories response");
    }

    return categories;
}

export async function getCategoryBySlug(
    slug: string
): Promise<Category | null> {
    const categories = await getCategories();

    const category = categories.find(
        (item) => item.slug === slug || item.id === slug
    );

    if (!category) {
        return null;
    }

    const data = await fetchJson(
        `/categories/${encodeURIComponent(category.id)}`
    );

    return data.category ?? data.data ?? data;
}

export async function getProducts(): Promise<Product[]> {
    const data = await fetchJson("/products");
    const products = data.products ?? data.data ?? data;

    if (!Array.isArray(products)) {
        throw new Error("Invalid products response");
    }

    return products;
}

export async function getProductsByCategory(
    category: string
): Promise<Product[]> {
    const data = await fetchJson(
        `/products?category=${encodeURIComponent(category)}`
    );

    const products = data.products ?? data.data ?? data;

    if (!Array.isArray(products)) {
        throw new Error("Invalid category products response");
    }

    return products;
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

    const data = await fetchJson(`/products/${listedProduct.id}`);
    const product = data.product ?? data.data ?? data;

    if (!product || typeof product !== "object") {
        throw new Error("Invalid product details response");
    }

    return {
        ...listedProduct,
        ...product,
        markets: Array.isArray(product.markets)
            ? product.markets
            : listedProduct.markets ?? [],
    } as Product;
}
