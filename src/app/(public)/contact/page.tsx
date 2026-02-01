export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <form className="bg-white border rounded-xl p-6 max-w-md shadow-sm space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="Message"
          rows={4}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Submit Message
        </button>
      </form>
    </main>
  );
}
