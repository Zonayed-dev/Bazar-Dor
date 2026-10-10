
export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton mb-6 h-10 w-56" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-base-300 p-4"
          >
            <div className="skeleton h-12 w-12" />
            <div className="skeleton mt-4 h-5 w-3/4" />
            <div className="skeleton mt-3 h-4 w-1/2" />
            <div className="skeleton mt-5 h-7 w-2/3" />
          </div>
        ))}
      </div>
    </main>
  );
}
