/**
 * Renders one JSON-LD script tag (server component).
 *
 * `<` is escaped so record copy can never terminate the script element
 * (the standard JSON-in-script injection guard).
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
