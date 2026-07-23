const themes = [
  { value: "vs-dark", label: "Dark" },
  { value: "hc-black", label: "High Contrast" },
  { value: "light", label: "Light" },
];

const STORAGE_KEY = "cc_editor_theme";

export function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "vs-dark";
  } catch {
    return "vs-dark";
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // demo-only persistence, fail silently
  }
}

export default function ThemeSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        saveTheme(e.target.value);
      }}
      className="bg-surface-2 text-ink font-body text-body-sm rounded-md px-[12px] py-[8px] outline-none"
      aria-label="Editor theme"
    >
      {themes.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
