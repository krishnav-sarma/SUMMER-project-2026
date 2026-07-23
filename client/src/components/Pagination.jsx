export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-xs2 mt-xl2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-9 h-9 rounded-full bg-surface-1 text-ink text-body-sm
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-2 transition-colors"
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-full text-body-sm font-body transition-colors ${
            p === page
              ? "bg-primary text-on-primary"
              : "bg-surface-1 text-ink-muted hover:bg-surface-2 hover:text-ink"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-full bg-surface-1 text-ink text-body-sm
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-2 transition-colors"
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}
