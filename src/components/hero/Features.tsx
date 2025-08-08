import AnimatedText from "@/animation/AnimatedText";

const features = [
  {
    title: "Generate Scripts",
    desc: "Create engaging, SEO-friendly scripts instantly with AI-powered creativity.",
    icon: "📝",
  },
  {
    title: "Text To Speech",
    desc: "Convert your text into natural-sounding voiceovers in multiple languages.",
    icon: "🗣️",
  },
  {
    title: "AI Video Maker",
    desc: "Produce professional-quality videos with the help of advanced AI tools.",
    icon: "🎬",
  },
  {
    title: "Generate Video from Prompt",
    desc: "Turn your ideas or prompts into stunning videos automatically.",
    icon: "💡",
  },
  {
    title: "Generate Video from Images",
    desc: "Transform your images into captivating videos with seamless transitions.",
    icon: "🖼️",
  },
  {
    title: "Extract Voice from Video",
    desc: "Easily extract and save voiceovers from any video file.",
    icon: "🔊",
  },
];

export default function Features() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white py-16">
      <section className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto text-center mb-12">
          <AnimatedText
            className="text-4xl md:text-5xl font-bold mb-4"
            text="Powerful AI Features"
          />
          <p className="text-lg text-gray-300 mt-5">
            Unlock the full potential of AI-driven content creation with our suite of advanced features.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm hover:bg-white/10 transition flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
