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
            <h2 className="h2 mb-6 max-w-[20ch]">
              Got something to build?{" "}
              <span className="muted">Tell me about it.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="lede mb-9 max-w-[42ch]">
              Internships, freelance work, a project that needs a second pair of
              hands — or just something you think I&apos;d find interesting.
              I read everything and reply to all of it.
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
                <span className="live-dot" />
                {profile.location} — {profile.available.toLowerCase()}
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
