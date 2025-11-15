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
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2"
          placeholder="How can we help?"
        />
      </div>
      <button type="submit" className="rounded-full bg-gray-900 px-6 py-2 text-sm font-semibold text-white">
        Submit
      </button>
      {status ? <p className="text-xs text-gray-500">{status}</p> : null}
    </form>
  );
};

export default ContactForm;
