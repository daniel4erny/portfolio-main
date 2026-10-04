import { stack } from "@/lib/content";

export default function Stack() {
  return (
    <section id="stack" className="section shell">
      <h2 className="h2">Tools I use</h2>

      <dl className="tools">
        {stack.map((item) => (
          <div key={item.name} className="tool">
            <dt className="build-title">{item.name}</dt>
            <dd className="body-text">{item.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
