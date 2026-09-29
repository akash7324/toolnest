import Link from "next/link";

const faqs = [
  ["Are ToolNest tools free?", "The current ToolNest release is designed around free access to the core tools. A future Pro plan is architected but payment processing is not active yet."],
  ["Do I need an account?", "Basic tools can be used without an account where the implementation does not require authentication. Accounts add features such as favorites, history and usage tracking."],
  ["Are my image and PDF files uploaded?", "The current image and PDF tools are designed to process supported files in the browser. ToolNest does not need to permanently store those files."],
  ["Will ToolNest show advertisements?", "Free-user monetization is designed around responsible advertising. Ad placements are currently placeholders and real AdSense integration remains disabled until the site is ready."],
  ["How can I contact ToolNest?", "Use the Contact page to send a message. Site support settings can be configured from the protected admin area."],
];

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
      <p className="text-sm font-bold text-indigo-600">Help center</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Frequently Asked Questions</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">Common questions about ToolNest, privacy, accounts and the future monetization model.</p>
      <div className="mt-10 space-y-4">
        {faqs.map(([question, answer]) => (
          <details key={question} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <summary className="cursor-pointer font-bold">{question}</summary>
            <p className="mt-3 leading-7 text-[var(--muted)]">{answer}</p>
          </details>
        ))}
      </div>
      <Link href="/contact" className="mt-8 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white">Still need help?</Link>
    </main>
  );
}
