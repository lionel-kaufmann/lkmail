"use client";

import { useActionState } from "react";
import { sendEmail } from "@/app/actions/sendEmail";

export default function ContactForm({ dict }: { dict: any }) {
  // useActionState is the modern React 19 way to handle form actions
  const [state, formAction, isPending] = useActionState(sendEmail, null);

  if (state?.success) {
    return (
      <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300">
        <p className="font-medium text-center">{dict.contact.success}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-xl">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {dict.contact.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {dict.contact.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {dict.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all resize-none"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500 font-medium">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-fuchsia-500 dark:hover:bg-fuchsia-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? dict.contact.sending : dict.contact.send}
      </button>
    </form>
  );
}