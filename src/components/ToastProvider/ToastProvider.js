import React, { useMemo, useState } from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext([]);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  function createToast(
    message,
    variant,
    autodismiss = false,
    dismissDuration = 5000
  ) {
    const newToast = {
      id: crypto.randomUUID(),
      message: message,
      variant: variant,
      autoDismiss: autoDismiss,
      dismissDuration: dismissDuration,
    };
    console.log(newToast.id);
    setToasts((c) => [...c, newToast]);
    if (autodismiss) {
      autoDismiss(newToast.id, dismissDuration);
      console.log("autodismiss");
    }
    return newToast.id;
  }
  function deleteToast(id) {
    setToasts((c) => c.filter((toast) => toast.id !== id));
  }
  function autoDismiss(id, duration) {
    setTimeout(() => {
      deleteToast(id);
    }, duration);
  }
  function deleteAllToasts() {
    setToasts([]);
  }
  const value = useMemo(() => {
    return {
      toasts,
      createToast,
      deleteToast,
      deleteAllToasts,
    };
  }, [toasts]);
  useEscapeKey(() => deleteAllToasts());
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
