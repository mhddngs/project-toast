import React, { useEffect, useState } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({
  variant = "notice",
  children,
  dismissToast,
  autoDismiss,
  dismissDuration,
}) {
  const isValid = variant in ICONS_BY_VARIANT;
  const validVariant = isValid ? variant : "notice";
  const Icon = ICONS_BY_VARIANT[validVariant];
  const [durationLeft, setDurationLeft] = useState(0);

  useEffect(() => {
    // countdown every second for dismissDuration
    if (autoDismiss && dismissDuration) {
      setDurationLeft(dismissDuration / 1000);
      const interval = setInterval(() => {
        setDurationLeft((prev) => prev - 0.025);
      }, 25);
      return () => clearInterval(interval);
    }
  }, [autoDismiss, dismissDuration]);
  return (
    <div
      className={`${styles.toast} ${styles[validVariant]}`}
      style={{ overflow: "hidden" }}
    >
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{`${variant} -`}</VisuallyHidden>
        {children}
      </p>
      <button
        aria-label="Dismiss message"
        aria-live="off"
        className={styles.closeButton}
        onClick={dismissToast}
      >
        <X size={24} />
      </button>
      {autoDismiss && (
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            height: "4px",
            width: `${(durationLeft / (dismissDuration / 1000)) * 100}%`,
            backgroundColor: `var(--color-${validVariant})`,
          }}
        />
      )}
    </div>
  );
}

export default Toast;
