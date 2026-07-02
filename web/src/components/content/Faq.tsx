import styles from "./content.module.css";

/**
 * Visible FAQ, server-rendered as real HTML. The FAQPage JSON-LD is built
 * from the same array (lib/seo/jsonld.ts faqPage), so markup and page text
 * always match, as the page specs require.
 */
export default function Faq({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <section className={styles.block}>
      <span className={styles.eyebrow}>FAQ</span>
      <h2 className={styles.heading}>Frequently asked questions</h2>
      {items.map((item) => (
        <div key={item.q} className={styles.faqItem}>
          <h3 className={styles.faqQ}>{item.q}</h3>
          <p className={styles.faqA}>{item.a}</p>
        </div>
      ))}
    </section>
  );
}
