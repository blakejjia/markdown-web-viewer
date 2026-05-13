import { Suspense } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import LandingSearch from '@/components/LandingSearch';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ 
    url?: string; 
    md?: string; 
    content?: string;
  }>;
}

async function MarkdownFetcher({ url }: { url: string }) {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown: ${response.statusText}`);
    }

    const content = await response.text();

    return (
      <div className="w-full min-h-screen bg-white dark:bg-zinc-950">
        <MarkdownRenderer content={content} />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-zinc-950">
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

function Base64Renderer({ base64 }: { base64: string }) {
  try {
    // Handle potential URL-safe base64
    const normalizedBase64 = base64.replace(/-/g, '+').replace(/_/g, '/');
    const content = Buffer.from(normalizedBase64, 'base64').toString('utf-8');
    
    return (
      <div className="w-full min-h-screen bg-white dark:bg-zinc-950">
        <MarkdownRenderer content={content} />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-zinc-950">
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-full mb-6 text-amber-600 dark:text-amber-400">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Invalid Content</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
          The provided content could not be decoded. Please ensure it is a valid Base64 string.
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

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const targetUrl = params.url || params.md;
  const base64Content = params.content;

  // Priority: URL > Content > Search UI
  if (targetUrl) {
    return (
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-950">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-zinc-500 animate-pulse">Fetching and rendering...</p>
        </div>
      }>
        <MarkdownFetcher url={targetUrl} />
      </Suspense>
    );
  }

  if (base64Content) {
    return <Base64Renderer base64={base64Content} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-4">
      <LandingSearch />
    </div>
  );
}
