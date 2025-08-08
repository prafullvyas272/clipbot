import AnimatedText from "@/animation/AnimatedText";

export default function Blog() {
  const blogPosts = [
    {
      title: "How AI is Revolutionizing Video Creation",
      desc: "Discover how artificial intelligence is transforming the way creators produce scripts, voiceovers, and videos for YouTube and beyond.",
      date: "June 1, 2024",
      author: "Jane Doe",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
    {
      title: "5 Tips for Writing Engaging Scripts with AI",
      desc: "Learn actionable tips to craft compelling scripts using AI tools, ensuring your content stands out and captivates your audience.",
      date: "May 20, 2024",
      author: "John Smith",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
    {
      title: "From Text to Speech: The Future of Voiceovers",
      desc: "Explore the latest advancements in AI-powered voiceovers and how they're making professional audio accessible to everyone.",
      date: "May 10, 2024",
      author: "Alex Lee",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
    {
      title: "Maximizing YouTube Growth with AI Tools",
      desc: "Uncover strategies to boost your YouTube channel growth by leveraging the latest AI-powered content creation tools.",
      date: "April 28, 2024",
      author: "Priya Patel",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
    {
      title: "AI Video Editing: Speed Up Your Workflow",
      desc: "See how AI-driven video editing platforms can save you hours and help you produce professional-quality videos faster.",
      date: "April 15, 2024",
      author: "Carlos Gomez",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
    {
      title: "The Ethics of AI in Content Creation",
      desc: "A thoughtful look at the ethical considerations and responsibilities when using AI to generate creative content.",
      date: "March 30, 2024",
      author: "Emily Chen",
      image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
    {
      title: "Beginner’s Guide to AI Script Generators",
      desc: "Start your journey with AI script generators and learn how to create engaging content with minimal effort.",
      date: "March 15, 2024",
      author: "Michael Brown",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
    {
      title: "How to Choose the Right AI Voice for Your Brand",
      desc: "Tips and tricks for selecting the perfect AI-generated voice that matches your brand’s personality and audience.",
      date: "March 1, 2024",
      author: "Sara Kim",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
    {
      title: "Case Study: Viral Videos Made with AI",
      desc: "A deep dive into real-world examples of viral videos created using AI, and what you can learn from them.",
      date: "February 20, 2024",
      author: "David Park",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      url: "#",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">
      <section className="mt-20 flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto text-center mt-24">
          <AnimatedText
            className="text-4xl md:text-5xl font-bold mb-4"
            text="Latest Insights & AI Blog"
          />
          <p className="text-lg text-gray-300 mb-8 mt-5">
            Stay up to date with the latest trends, tips, and guides on AI-powered content creation.
          </p>
        </div>
      </section>
      <section className="mt-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <a
                href={post.url}
                key={idx}
                className="group bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm hover:bg-white/10 transition flex flex-col overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 flex-1">{post.desc}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
