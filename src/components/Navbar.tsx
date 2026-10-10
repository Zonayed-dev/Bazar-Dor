
import Link from "next/link";


const categories = [
    { name: "সব পণ্য", emoji: "🛒", href: "/#সব-পণ্য" },
    { name: "চাল", emoji: "🍚", href: "/category/chal" },
    { name: "ডাল", emoji: "🫘", href: "/category/dal" },
    { name: "তেল", emoji: "🫗", href: "/category/tel" },
    { name: "সবজি", emoji: "🥬", href: "/category/sobji" },
    { name: "মাছ", emoji: "🐟", href: "/category/mach" },
    { name: "মাংস", emoji: "🍗", href: "/category/mangsho" },
    { name: "ডিম-দুধ", emoji: "🥚", href: "/category/dim-dui" },
    { name: "মসলা", emoji: "🌶️", href: "/category/mosla" },
];


export default function Navbar() {
    return (
        <header className="border-b border-base-300 bg-base-100">
            <div className="navbar mx-auto max-w-6xl px-4">
                <div className="navbar-start">
                    <Link href="/" className="text-xl font-bold text-success sm:text-2xl">
                        🛒 বাজার দর
                    </Link>
                </div>

                <div className="navbar-end gap-2">
                    <Link href="/signin" className="btn btn-ghost btn-sm">
                        সাইন ইন
                    </Link>
                    <Link href="/signup" className="btn btn-success btn-sm">
                        সাইন আপ
                    </Link>
                </div>
            </div>

            <nav className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-4 pb-3">
                {categories.map((category, index) => (
                    <Link
                        key={category.href}
                        href={category.href}
                        className={`btn btn-sm ${index === 0 ? "btn-success" : "btn-ghost"
                            }`}
                    >
                        <span>{category.emoji}</span>
                        <span>{category.name}</span>
                    </Link>
                ))}
            </nav>
        </header>
    );
}
