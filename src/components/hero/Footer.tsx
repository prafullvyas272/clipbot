export default function Footer() {
  return (
    <footer className="w-full bg-black/90  border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12">
        {/* Left: Brand and Description */}
        <div className="flex flex-col items-start mb-8 md:mb-0 flex-grow w-full">
          <div className="text-2xl font-bold text-purple-400 mb-2 w-full">Clipbot</div>
          <p className="text-gray-400 text-sm w-full mb-4">
            The complete AI toolkit to transform your ideas into scripts, voiceovers, and videos — ready for YouTube in minutes.
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              {/* Twitter SVG */}
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  d="M22 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 11.07 9.03a12.72 12.72 0 0 1-9.23-4.68 4.48 4.48 0 0 0 1.39 5.98A4.44 4.44 0 0 1 2 9.13v.057a4.48 4.48 0 0 0 3.59 4.39c-.37.1-.76.15-1.16.057a4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.07a12.67 12.67 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.77 0-.19-.01-.38-.02-.57A9.1 9.1 0 0 0 22 5.924z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              {/* Facebook SVG */}
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              {/* LinkedIn SVG */}
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-9 19H5v-9h5v9zm-2.5-10.268c-1.656 0-2.5-1.343-2.5-2.5 0-1.157.844-2.5 2.5-2.5s2.5 1.343 2.5 2.5c0 1.157-.844 2.5-2.5 2.5zm14.5 10.268h-5v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-5v-9h5v1.268c.69-1.104 2.104-1.268 3-1.268 2.209 0 4 1.791 4 4v5z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              {/* YouTube SVG */}
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  d="M23.498 6.186a2.997 2.997 0 0 0-2.112-2.12C19.19 3.5 12 3.5 12 3.5s-7.19 0-9.386.566A2.997 2.997 0 0 0 .502 6.186C0 8.38 0 12 0 12s0 3.62.502 5.814a2.997 2.997 0 0 0 2.112 2.12C4.81 20.5 12 20.5 12 20.5s7.19 0 9.386-.566a2.997 2.997 0 0 0 2.112-2.12C24 15.62 24 12 24 12s0-3.62-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Newsletter or Legal */}
        <div className="w-full md:w-auto md:max-w-xs flex flex-col items-end shrink-0">
          <div className="mb-4 w-full">
            <form className="flex flex-col">
              <label htmlFor="newsletter" className="text-gray-300 text-sm mb-2">
                Subscribe to our newsletter
              </label>
              <div className="flex">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-md bg-gray-900 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-r-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="text-gray-500 text-xs text-right w-full">
            &copy; {new Date().getFullYear()} Clipbot. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
