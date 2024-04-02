import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { ToastContext } from "../ToastProvider/ToastProvider";
import ToastShelf from "../ToastShelf/ToastShelf";
import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [toastVariant, setToastVariant] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [autodismiss, setAutodismiss] = useState(false);
  const [dismissDuration, setDismissDuration] = useState("");
  const { createToast, toasts } = useContext(ToastContext);
  function resetForm() {
    setToastMessage("");
    setToastVariant("notice");
  }
  console.log({ autodismiss });
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createToast(toastMessage, toastVariant, autodismiss, dismissDuration);
          resetForm();
        }}
      >
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                onChange={(e) => setToastMessage(e.target.value)}
                value={toastMessage}
                placeholder="Set toast message"
                required
                id="message"
                className={styles.messageInput}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((variant) => (
                <label
                  key={`variant-${variant}`}
                  htmlFor={`variant-${variant}`}
                >
                  <input
                    onChange={(e) => setToastVariant(e.target.value)}
                    id={`variant-${variant}`}
                    type="radio"
                    name="variant"
                    value={variant}
                    checked={variant === toastVariant}
                  />
                  {variant}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Auto dismiss?</div>
            <div className={`${styles.inputWrapper}`}>
              <label htmlFor="autodismiss">
                <input
                  id="autodismiss"
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setAutodismiss(e.target.checked);
                  }}
                  value={autodismiss}
                  name="autodismiss"
                  type="checkbox"
                />
              </label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Dismiss duration</div>
            <div className={`${styles.inputWrapper}`}>
              <label htmlFor="dismissDuration">
                <input
                  id="dismissDuration"
                  onChange={(e) => {
                    setDismissDuration(e.target.value);
                  }}
                  value={dismissDuration}
                  disabled={!autodismiss}
                  name="timeout"
                  type="number"
                  placeholder="duration"
                />
              </label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
