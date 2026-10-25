import { useEffect } from 'react';

// Renders the list of active toasts in the bottom-right corner.
export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  // Each toast sets its own timer, and clears it if removed early.
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className={`toast ${toast.tone}`} role="status">
      <span>{toast.message}</span>
      <button aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}>✕</button>
    </div>
  );
}
