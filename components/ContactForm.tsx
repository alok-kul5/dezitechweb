"use client";

import { FormEvent, useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Message captured (placeholder).");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--tone-muted)]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-[16px] border border-white/15 bg-white/[0.03] px-4 py-2.5 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--tone-muted)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-[16px] border border-white/15 bg-white/[0.03] px-4 py-2.5 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--tone-muted)]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-2 w-full rounded-[16px] border border-white/15 bg-white/[0.03] px-4 py-2.5 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            placeholder="How can we help?"
          />
        </div>
        <button
          type="submit"
          className="hero-cta rounded-full bg-[#C8102E] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.32em] text-white"
        >
          Submit
        </button>
        {status ? <p className="text-xs text-[var(--tone-muted)]">{status}</p> : null}
    </form>
  );
};

export default ContactForm;
