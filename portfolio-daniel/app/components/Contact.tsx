import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { profile } from "@/lib/content";
import { IconGitHub, IconMail } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="section shell">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Contact</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="h2 mb-6">Get in touch</h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="lede mb-9 max-w-[42ch]">
              Have an internship, a freelance job or a project you could use
              help with? Send me a message and I&apos;ll get back to you.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${profile.email}`} className="social-link">
                <IconMail />
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="social-link"
              >
                <IconGitHub />
                github.com/{profile.githubHandle}
              </a>
              <span className="social-link pointer-events-none">
                {profile.location} · {profile.available.toLowerCase()}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="panel p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
