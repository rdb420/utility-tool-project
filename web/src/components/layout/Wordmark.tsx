import styles from "./Wordmark.module.css";

type WordmarkProps = {
  /** "bar" for the app bar lockup, "hero" for page headers. */
  size?: "bar" | "hero";
  className?: string;
};

/**
 * The OpsCrunch wordmark: lowercase "ops" + signal-orange "crunch" closed by
 * a blinking amber block cursor. "ops" inherits the surrounding text colour,
 * so it reads white on ink and ink on paper.
 */
export default function Wordmark({ size = "bar", className }: WordmarkProps) {
  const classes = [styles.wm, size === "hero" ? styles.hero : styles.bar];
  if (className) classes.push(className);
  return (
    <span className={classes.join(" ")}>
      ops<span className={styles.crunch}>crunch</span>
      <span className={styles.cursor} aria-hidden="true" />
    </span>
  );
}
