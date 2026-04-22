'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { X, Download } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to handle download
  const handleDownload = async (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = url.split('/').pop() || 'downloaded-image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback: open in new tab if fetch fails (CORS issue)
      window.open(url, '_blank');
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scroll when open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <>
      <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto prose-pre:bg-transparent prose-pre:p-0 px-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // Custom image rendering with Lightbox
            img: (props) => {
              const { src, alt } = props;
              return (
                <span className="block my-8">
                  <span 
                    onClick={() => setSelectedImage(src as string)}
                    className="cursor-zoom-in block group relative"
                  >
                    <img
                      src={src as string}
                      alt={alt as string}
                      className="max-w-full lg:max-w-[80%] mx-auto rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-300 group-hover:shadow-2xl group-hover:brightness-95"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-xl">
                        <span className="text-white text-sm font-medium">Click to Expand</span>
                      </div>
                    </div>
                  </span>
                  {alt && <span className="block text-center text-sm text-zinc-500 mt-2 font-medium">{alt}</span>}
                </span>
              );
            },
            // Enhance table styling
            table: ({ children }) => (
              <div className="overflow-x-auto my-8 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <table className="w-full border-collapse !my-0">
                  {children}
                </table>
              </div>
            ),
            code: (props) => {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');

              if (match) {
                return (
                  <CodeBlock className={className}>
                    {children}
                  </CodeBlock>
                );
              }

              return (
                <code className={`${className} bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono`} {...rest}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm p-4 md:p-12 transition-all duration-300 animate-in fade-in zoom-in-95"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-500"
              alt="Zoomed"
            />
            
            <div className="absolute top-0 right-0 m-4 flex flex-col gap-3">
              <button 
                title="Close (Esc)"
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="w-6 h-6" />
              </button>
              
              <button 
                title="Download Image"
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
                onClick={(e) => handleDownload(e, selectedImage)}
              >
                <Download className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
