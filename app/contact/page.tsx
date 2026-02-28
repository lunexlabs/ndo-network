"use client";

import { useState } from "react";
import Container from "../../src/components/layout/Container";
import { submitContact } from "./actions";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");

    const result = await submitContact(formData);

    if (result?.error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  return (
    <section className="py-15 bg-white">
      <Container>
        <div className="max-w-2xl mx-auto">
          <span className="text-sm uppercase tracking-widest text-black-600 mb-6 block">
            Contact
          </span>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Get In Touch
          </h1>

          <p className="text-gray-600 mb-12">
            For business inquiries, collaborations, or general questions,
            reach out below.
          </p>

          {status === "success" ? (
            <div className="bg-green-100 text-green-700 p-6 rounded-md">
              Your message has been sent successfully. We'll get back to you soon.
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  title="Your name"
                  name="name"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  title="Your email address"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  title="Select inquiry type"
                  name="category"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select an option</option>
                  <option value="Business / Sponsorship">
                    Business / Sponsorship
                  </option>
                  <option value="Collaboration">
                    Collaboration
                  </option>
                  <option value="General Message">
                    General Message
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  title="Your message"
                  name="message"
                  rows={5}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <div className="bg-red-100 text-red-700 p-4 rounded-md">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-black hover:bg-gray-700 text-white py-3 rounded-md font-medium transition disabled:opacity-50"
              >
                {status === "loading"
                  ? "Sending..."
                  : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}