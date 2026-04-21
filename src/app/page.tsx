'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
          Markdown Viewer
        </h1>
        
        <form onSubmit={handleView} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000" />
          <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2">
            <div className="flex-1 flex items-center px-4">
              <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
              <input
                type="url"
                placeholder="Paste Markdown URL here..."
                className="w-full bg-transparent border-none focus:ring-0 py-3 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 outline-none"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center aspect-square p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all"
              aria-label="View Markdown"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        <p className="mt-6 text-zinc-500 text-sm">
          Enter a URL to a raw .md file to view it beautifully.
        </p>
      </div>
    </div>
  );
}
