import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto prose-pre:bg-transparent prose-pre:p-0 px-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Custom image rendering to control size
          img: ({ src, alt }) => (
            <span className="block my-8">
              <img
                src={src}
                alt={alt}
                className="max-w-full lg:max-w-[70%] mx-auto rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-[1.01]"
              />
              {alt && <span className="block text-center text-sm text-zinc-500 mt-2">{alt}</span>}
            </span>
          ),
          // Enhance table styling
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <table className="w-full border-collapse !my-0">
                {children}
              </table>
            </div>
          ),
          // @ts-ignore
          code: (props) => {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');

            if (match) {
              return (
                // @ts-ignore - RSC in component mapping
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
