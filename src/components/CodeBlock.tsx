import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

export default async function CodeBlock({ className, children }: CodeBlockProps) {
  const language = className?.replace('language-', '') || 'text';
  const code = String(children).replace(/\n$/, '');

  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    });

    return (
      <div 
        className="rounded-lg overflow-hidden my-4 shadow-xl"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  } catch (error) {
    console.error('Shiki highlighting failed:', error);
    return (
      <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg my-4 overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    );
  }
}
