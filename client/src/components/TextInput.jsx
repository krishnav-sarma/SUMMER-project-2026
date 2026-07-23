export default function TextInput({ label, className = "", ...props }) {
  return (
    <label className="flex flex-col gap-xs2 text-left">
      {label && (
        <span className="font-body text-caption text-ink-muted">{label}</span>
      )}
      <input
        className={`bg-surface-1 text-ink font-body text-body rounded-md px-[14px] py-[10px]
          border border-transparent outline-none
          focus:shadow-[0_0_0_1px_rgba(0,153,255,0.15)] focus:border-accent-blue/40
          placeholder:text-ink-muted ${className}`}
        {...props}
      />
    </label>
  );
}
