const sizeClasses = {
  sm: "w-8 h-8 text-caption",
  md: "w-12 h-12 text-body-sm",
  lg: "w-20 h-20 text-headline",
};

const palette = ["#6a4cf5", "#d44df0", "#ff7a3d", "#ff5577", "#0099ff"];

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function colorFor(name) {
  const sum = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return palette[sum % palette.length];
}

export default function Avatar({ name, size = "md" }) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-body font-semibold text-white shrink-0`}
      style={{ backgroundColor: colorFor(name) }}
    >
      {initials(name)}
    </div>
  );
}
