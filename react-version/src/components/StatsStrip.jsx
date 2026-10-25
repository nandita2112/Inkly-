export default function StatsStrip({ stats }) {
  return (
    <section className="stats-strip">
      {stats.map((stat) => (
        <div key={stat.label}>
          <b>{stat.value}</b>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
