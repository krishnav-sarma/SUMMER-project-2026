const difficulties = ["Easy", "Medium", "Hard"];

export default function FilterBar({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
  topic,
  onTopicChange,
  topics,
  company,
  onCompanyChange,
  companies,
  activeTag,
  onTagChange,
  tags,
  onClearAll,
  hasActiveFilters,
}) {
  return (
    <div className="bg-surface-1 rounded-xl p-md2 flex flex-col gap-md2">
      <div className="flex flex-col md:flex-row gap-sm2">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search problems…"
          className="flex-1 bg-surface-2 text-ink font-body text-body rounded-md
            px-[14px] py-[10px] outline-none placeholder:text-ink-muted
            focus:shadow-[0_0_0_1px_rgba(0,153,255,0.15)]"
        />

        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="bg-surface-2 text-ink font-body text-body-sm rounded-md px-[14px] py-[10px] outline-none"
        >
          <option value="">All difficulties</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="bg-surface-2 text-ink font-body text-body-sm rounded-md px-[14px] py-[10px] outline-none"
        >
          <option value="">All topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
          className="bg-surface-2 text-ink font-body text-body-sm rounded-md px-[14px] py-[10px] outline-none"
        >
          <option value="">All companies</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-xs2">
        <span className="font-body text-caption text-ink-muted mr-xs2">Tags:</span>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(activeTag === tag ? "" : tag)}
            className={`font-body text-caption px-[12px] py-[6px] rounded-pill transition-colors ${
              activeTag === tag
                ? "bg-primary text-on-primary"
                : "bg-surface-2 text-ink-muted hover:text-ink"
            }`}
          >
            {tag}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="font-body text-caption text-accent-blue ml-sm2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
