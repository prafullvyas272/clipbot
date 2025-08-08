import AnimatedText from "@/animation/AnimatedText";

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">

      <section className="mt-20 flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto text-center mt-24">
          <AnimatedText
            text="Contact Us"
          />
          <p className="text-lg text-gray-300 mb-8 mt-5">
            Have questions, feedback, or want to collaborate? Fill out the form below and our team will get back to you soon.
          </p>
        </div>
      </section>
      <section className="mt-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm overflow-hidden">
            {/* Left Side: Unsplash Image */}
            <div className="hidden md:block h-full">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
                alt="Contact us"
                className="object-cover w-full h-full min-h-[400px]"
                style={{ minHeight: "100%" }}
              />
            </div>
            {/* Right Side: Contact Form */}
            <div className="flex flex-col justify-center p-8">
              <form className="flex flex-col space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
              <div className="mt-8 text-center text-gray-400 text-sm">
                Or email us directly at{" "}
                <a
                  href="mailto:support@clipbot.ai"
                  className="text-purple-400 hover:underline"
                >
                  support@clipbot.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
