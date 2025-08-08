import React from "react";

export function TransparentNavbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-purple-600">Clipbot</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-base text-muted-foreground hover:text-purple-600 transition-colors">
            Features
          </a>
          <a href="#" className="text-base text-muted-foreground hover:text-purple-600 transition-colors">
            Pricing
          </a>
          <a href="#" className="text-base text-muted-foreground hover:text-purple-600 transition-colors">
            Blog
          </a>
          <a href="#" className="text-base text-muted-foreground hover:text-purple-600 transition-colors">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="#"
            className="px-4 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}
