// Thin bar fixed to the top of the screen that grows as the reader scrolls.
export default function ReadingProgress({ percent }) {
  return <div className="reading-progress" style={{ width: `${percent}%` }} aria-hidden="true" />;
}
