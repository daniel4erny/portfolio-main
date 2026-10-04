import ContactForm from "./ContactForm";
import { profile } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="section shell">
      <div className="contact">
        <div>
          <h2 className="h2">Contact</h2>
          <p className="body-text mt-6 max-w-[40ch]">
            {profile.available}. Write to{" "}
            <a href={`mailto:${profile.email}`} className="whitespace-nowrap">
              {profile.email}
            </a>{" "}
            or use the form, and I&apos;ll reply by email.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
