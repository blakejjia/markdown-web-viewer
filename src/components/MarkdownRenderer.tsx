'use client';

import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { X, Download, List } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

// Helper to slugify text consistently
const slugify = (text: string) => 
  text.toLowerCase().trim().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');

// Helper to get plain text from React children
const getFlattenedText = (children: any): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getFlattenedText).join('');
  if (typeof children === 'object' && children?.props?.children) return getFlattenedText(children.props.children);
  return '';
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Extract headings for TOC
  const headings = useMemo(() => {
    const lines = content.split('\n');
    const toc: { id: string; text: string; level: number }[] = [];
    
    lines.forEach((line) => {
      const match = line.match(/^(#{1,2})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].replace(/[*_`]/g, '').trim();
        const id = slugify(text);
        if (id) toc.push({ id, text, level });
      }
    });
    return toc;
  }, [content]);

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

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Account for any sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Sidebar TOC */}
        {headings.length > 0 && (
          <aside className="lg:w-72 lg:shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
            <div className="lg:sticky lg:top-0 p-8 h-screen overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 mb-8 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
                <List className="w-5 h-5 text-indigo-500" />
                <h2>Contents</h2>
              </div>
              <nav className="space-y-1">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToId(heading.id)}
                    className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm transition-all duration-200 group text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 ${heading.level === 2 ? 'pl-8' : ''}`}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-3 bg-zinc-300 dark:bg-zinc-700 transition-all group-hover:bg-indigo-500" />
                    {heading.text}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <article className={`prose prose-zinc dark:prose-invert max-w-4xl prose-pre:bg-transparent prose-pre:p-0 flex-1 min-w-0 py-12 px-8 lg:px-16 ${headings.length === 0 ? 'mx-auto' : ''}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // Add IDs to headings for TOC linking
              h1: ({ children }) => {
                const text = getFlattenedText(children);
                const id = slugify(text);
                return <h1 id={id} className="scroll-mt-20 group relative">
                  {children}
                  <span className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300 dark:text-zinc-700">#</span>
                </h1>;
              },
              h2: ({ children }) => {
                const text = getFlattenedText(children);
                const id = slugify(text);
                return <h2 id={id} className="scroll-mt-20 group relative border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  {children}
                  <span className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300 dark:text-zinc-700">#</span>
                </h2>;
              },
              // Custom image rendering with Lightbox
              img: (props) => {
                const { src, alt } = props;
                return (
                  <span className="block my-8 text-center">
                    <span 
                      onClick={() => setSelectedImage(src as string)}
                      className="cursor-zoom-in inline-block group relative mx-auto"
                    >
                      <img
                        src={src as string}
                        alt={alt as string}
                        className="max-w-full lg:max-w-[90%] rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-300 group-hover:shadow-2xl group-hover:brightness-95"
                      />
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-xl">
                          <span className="text-white text-sm font-medium">Click to Expand</span>
                        </span>
                      </span>
                    </span>
                    {alt && <span className="block text-center text-sm text-zinc-500 mt-2 font-medium">{alt}</span>}
                  </span>
                );
              },
              // Enhance table styling
              table: ({ children }) => (
                <div className="overflow-x-auto my-8 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900/50">
                  <table className="w-full border-collapse !my-0 text-sm">
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
      </div>

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
