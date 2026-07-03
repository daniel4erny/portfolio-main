"use client";

import { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[34rem] flex flex-col gap-4 text-left"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          className="form-field"
          type="text"
          name="name"
          placeholder="Your name"
          required
        />
        <input
          className="form-field"
          type="email"
          name="email"
          placeholder="Your email"
          required
        />
      </div>
      <textarea
        className="form-field"
        name="message"
        placeholder="Your message"
        required
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "sent" && (
          <span className="text-sm text-accent">Message sent, thanks!</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-400">
            Something went wrong. Try again or use email.
          </span>
        )}
      </div>
    </form>
  );
}
