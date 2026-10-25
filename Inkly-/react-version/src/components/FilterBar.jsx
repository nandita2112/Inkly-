// Row of category buttons. Receives the active value and a change callback from its parent.
export default function FilterBar({ options, active, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter by category">
      {options.map((option) => (
        <button
          key={option.value}
          className={`filter-btn ${active === option.value ? 'active' : ''}`}
          aria-pressed={active === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          <small>{option.count}</small>
        </button>
      ))}
    </div>
  );
}
