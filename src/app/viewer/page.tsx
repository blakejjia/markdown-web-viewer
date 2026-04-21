import { Suspense } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Header from '@/components/layout/Header';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ViewerPageProps {
  searchParams: Promise<{ md?: string }>;
}

async function MarkdownFetcher({ url }: { url: string }) {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown: ${response.statusText}`);
    }

    const content = await response.text();

    return (
      <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-10">
        <MarkdownRenderer content={content} />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-full mb-6 text-red-600 dark:text-red-400">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Error Loading Markdown</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
          {error instanceof Error ? error.message : 'An unexpected error occurred while fetching the remote file.'}
        </p>
        <Link 
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back Home
        </Link>
      </div>
    );
  }
}

export default async function ViewerPage({ searchParams }: ViewerPageProps) {
  const { md: url } = await searchParams;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {!url ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-full mb-6 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-12 h-12" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">No URL Provided</h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
              Please provide a markdown file URL using the <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">?md=</code> parameter.
            </p>
            <Link 
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back Home
            </Link>
          </div>
        ) : (
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
              <p className="text-zinc-500 animate-pulse">Fetching and rendering markdown...</p>
            </div>
          }>
            <MarkdownFetcher url={url} />
          </Suspense>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Modern MD Viewer. Built with Next.js & Shiki.</p>
      </footer>
    </div>
  );
}
