// Reusable header block for inner pages. `title` accepts JSX so parts can be highlighted.
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <small className="eyebrow">{eyebrow}</small>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  );
}
