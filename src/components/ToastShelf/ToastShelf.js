import React, { useContext } from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastShelf() {
  const { toasts, deleteToast } = useContext(ToastContext);
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts?.map(({ id, message, variant, autoDismiss, dismissDuration }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast
            variant={variant}
            dismissToast={() => deleteToast(id)}
            autoDismiss={autoDismiss}
            dismissDuration={dismissDuration}
          >
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
