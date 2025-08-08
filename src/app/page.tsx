import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TransparentNavbar } from "@/components/header";
import AnimatedText from "@/animation/AnimatedText";
import Blog from "@/components/hero/Blog";
import Contact from "@/components/hero/Contact";
import Features from "@/components/hero/Features";
import Pricing from "@/components/hero/Pricing";

export default function Home() {
  const features = [
    {
      title: "Write Scripts",
      desc: "Generate engaging, SEO-friendly scripts in seconds with AI-powered creativity.",
      icon: "📝",
    },
    {
      title: "Create Voiceovers",
      desc: "Produce studio-quality, natural-sounding voiceovers in multiple languages.",
      icon: "🎤",
    },
    {
      title: "Produce Videos",
      desc: "Turn scripts and audio into ready-to-upload videos instantly.",
      icon: "🎬",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">
      <TransparentNavbar />
      <section className="mt-20 flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto text-center mt-24">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Write <span className="font-bold text-purple-400">Scripts</span>,
            Create <span className="font-bold text-purple-400">Voiceovers</span>
            , and Produce{" "}
            <span className="font-bold text-purple-400">Videos</span>{" "}
            effortlessly with{" "}
            <span className="font-bold text-purple-400">AI</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            The complete AI toolkit to transform your ideas into scripts,
            voiceovers, and videos — ready for YouTube in minutes.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <a
              href="#"
              className="px-4 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      <section className="mt-20 flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Hero Heading */}
          {/* <AnimatedText
            className="text-4xl md:text-5xl font-bold mb-4"
            text="The Ultimate Solution for your Modern Problems"
          /> */}
          {/* 3 Column Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm hover:bg-white/10 transition"
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
      <section>
        <Blog/>
      </section>
      <section>
        <Contact/>
      </section>
      <section>
        <Features/>
      </section>
      <section>
        <Pricing/>
      </section>
    </main>
  );
}
