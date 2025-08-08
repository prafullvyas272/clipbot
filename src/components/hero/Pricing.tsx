import AnimatedText from "@/animation/AnimatedText";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Get started with basic features for personal use.",
    features: [
      "3 video exports/month",
      "Basic script & voiceover tools",
      "Community support",
    ],
    button: {
      label: "Get Started",
      href: "#",
      style: "bg-purple-600 hover:bg-purple-700 text-white",
    },
    highlight: false,
  },
  {
    name: "Standard",
    price: "$19",
    period: "/mo",
    description: "Unlock more exports and advanced features.",
    features: [
      "30 video exports/month",
      "Advanced script & voiceover tools",
      "Priority email support",
      "Remove watermark",
    ],
    button: {
      label: "Start Standard",
      href: "#",
      style: "bg-white text-purple-700 hover:bg-gray-100 border border-purple-600",
    },
    highlight: true,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For creators & teams who need it all.",
    features: [
      "Unlimited video exports",
      "All AI features unlocked",
      "Team collaboration",
      "Premium support",
      "No watermark",
    ],
    button: {
      label: "Go Pro",
      href: "#",
      style: "bg-purple-900 hover:bg-purple-800 text-white",
    },
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white py-16">
    <section className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto text-center mb-12">
        <AnimatedText
          className="text-4xl md:text-5xl font-bold mb-4"
          text="Simple, Transparent Pricing"
        />
        <p className="text-lg text-gray-300 mt-5">
          Choose the plan that fits your needs. No hidden fees, cancel anytime.
        </p>
      </div>
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ensure all cards stretch equally */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 rounded-2xl shadow-lg border border-white/10 bg-white/5 backdrop-blur-sm h-full ${
                plan.highlight
                  ? "border-purple-500 bg-purple-900/20 shadow-2xl scale-105 z-10"
                  : "hover:bg-white/10 transition"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2 text-white text-center">
                {plan.name}
              </h3>
  
              <div className="flex items-end justify-center mb-4">
                <span className="text-4xl text-purple-400 font-normal">
                  ₹
                  {plan.price
                    .replace("$", "")
                    .replace("49", "3999")
                    .replace("19", "1499")
                    .replace("0", "0")}
                </span>
                <span className="text-lg text-gray-300 ml-1">{plan.period}</span>
              </div>
  
              <p className="text-gray-300 text-center mb-6">{plan.description}</p>
  
              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-200">
                    <span className="mr-2 text-purple-400">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
  
              <a
                href={plan.button.href}
                className={`w-full px-4 py-2 rounded-md font-medium text-center transition-colors ${plan.button.style}`}
              >
                {plan.button.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
  
  );
}
