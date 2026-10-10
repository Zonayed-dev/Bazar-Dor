export default function Footer() {
    return (
        <footer className="border-t border-base-300 bg-base-200">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-lg font-bold">🛒 বাজার দর</p>
                    <p className="text-base-content/60">
                        প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>

                <p className="max-w-md text-base-content/60">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
                    পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
}