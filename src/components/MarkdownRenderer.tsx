import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
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
