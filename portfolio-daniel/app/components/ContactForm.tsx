"use client";

import { useState } from "react";
import { IconArrow } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="cf-name">
            Name
          </label>
          <input
            id="cf-name"
            className="form-field"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Jan Novák"
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            className="form-field"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="jan@example.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="cf-message">
          Message
        </label>
        <textarea
          id="cf-message"
          className="form-field"
          name="message"
          placeholder="What are you working on?"
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send message"}
          {status !== "sending" && <IconArrow width={15} height={15} />}
        </button>

        <p aria-live="polite" className="mono text-[1rem]">
          {status === "sent" && (
            <span className="text-emerald-400">
              Sent. You&apos;ll get a confirmation email.
            </span>
          )}
          {status === "error" && (
            <span className="text-red-400">
              That didn&apos;t go through, please email me directly.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
