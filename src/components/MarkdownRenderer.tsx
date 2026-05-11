import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-4xl prose-pre:bg-transparent prose-pre:p-0 mx-auto py-12 px-8 lg:px-16">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: (props) => {
            const { src, alt } = props;
            if (!src || typeof src !== 'string') return null;
            return (
              <span className="block my-4">
                <a 
                  href={src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  <span role="img" aria-label="image">🖼️</span>
                  {alt || 'View Image'}
                </a>
              </span>
            );
          },
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
  );
}
