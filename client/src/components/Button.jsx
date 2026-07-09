const variants = {
  primary:
    "bg-primary text-on-primary hover:opacity-90 active:scale-[0.97]",
  secondary:
    "bg-surface-1 text-ink hover:bg-surface-2",
  translucent:
    "bg-surface-2 text-ink hover:bg-white/10",
};

const sizes = {
  md: "px-[15px] py-[10px] rounded-pill",
  sm: "px-[14px] py-[8px] rounded-xxl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  as: Tag = "button",
  className = "",
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 font-body text-button
        transition-all duration-150 ease-out select-none whitespace-nowrap
        min-h-[44px] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
