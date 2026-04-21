'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ArrowRight, Search, Sparkles, Code2, Globe } from 'lucide-react';
import Header from '@/components/layout/Header';

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleView = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(`/viewer?md=${encodeURIComponent(url.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <main>
        <section className="relative pt-20 pb-32 px-4">
          {/* Background Decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
          
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Next-generation Markdown Viewing</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 leading-[1.1]">
              Render any Markdown <br className="hidden sm:block" /> file beautifully.
            </h1>
            
            <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Just paste a link to your remote .md file. We'll fetch it, handle the CORS, and render it with VS Code-quality syntax highlighting.
            </p>

            {/* Input Form */}
            <form onSubmit={handleView} className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200" />
              <div className="relative flex flex-col sm:flex-row gap-3 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
                  <input
                    type="url"
                    placeholder="https://raw.githubusercontent.com/.../README.md"
                    className="w-full bg-transparent border-none focus:ring-0 py-3 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 outline-none"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  View Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5"><Code2 className="w-4 h-4" /> Shiki Highlighting</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Server-side Fetching</span>
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> Typography Optimized</span>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="container mx-auto px-4 py-24 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:border-indigo-500/50">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Highlighting</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Powered by Shiki, providing the same high-quality syntax highlighting you're used to in VS Code.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:border-purple-500/50">
              <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">No CORS Issues</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Files are fetched on our server, meaning you can view markdown from almost any public URL without browser restrictions.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:border-teal-500/50">
              <div className="w-12 h-12 bg-teal-600/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Modern Typography</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Using @tailwindcss/typography with curated styles for a clean, readable documentation look.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-100 dark:border-zinc-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} Modern MD Viewer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
