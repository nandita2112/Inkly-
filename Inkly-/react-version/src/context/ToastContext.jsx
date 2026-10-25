import { createContext, useCallback, useContext, useState } from 'react';
import ToastStack from '../components/ToastStack.jsx';

const ToastContext = createContext(null);
let nextToastId = 1;

// Provides show(message, tone) to any component that wants to display a notification.
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // useCallback keeps these functions the same between renders, so memoised
  // children that receive them do not re-render unnecessarily.
  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((message, tone = 'success') => {
    const id = nextToastId++;
    setToasts((list) => [...list, { id, message, tone }]);
  }, []);

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>');
  return context;
}
