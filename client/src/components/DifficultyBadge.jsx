const styles = {
  Easy: "text-success",
  Medium: "text-gradient-orange",
  Hard: "text-gradient-coral",
};

export default function DifficultyBadge({ level }) {
  return (
    <span className={`font-body text-body-sm ${styles[level] || "text-ink-muted"}`}>
      {level}
    </span>
  );
}
