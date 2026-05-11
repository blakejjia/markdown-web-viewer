import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

export async function POST(req: Request) {
  try {
    const content = await req.text();

    if (!content) {
      return new Response('No content provided', { status: 400 });
    }

    // Process markdown with remark
    const result = await remark()
      .use(gfm)
      .use(() => (tree: any) => {
        // Simple visitor to transform image nodes to link nodes
        const visit = (node: any) => {
          if (node.type === 'image') {
            const originalUrl = node.url;
            const altText = node.alt || 'View Image';
            
            // Transform the node to a link
            node.type = 'link';
            node.url = originalUrl;
            node.children = [{ type: 'text', value: `🖼️ ${altText}` }];
            node.data = {
              hProperties: {
                target: '_blank',
                rel: 'noopener noreferrer',
                class: 'inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium my-2'
              }
            };
          }
          if (node.children) {
            node.children.forEach(visit);
          }
        };
        visit(tree);
      })
      .use(html)
      .process(content);

    const htmlContent = result.toString();

    // Wrap in a basic styled shell
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Render</title>
  <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
  <style>
    body { 
      background-color: #ffffff;
      color: #18181b;
      margin: 0;
      padding: 3rem 2rem;
    }
    @media (prefers-color-scheme: dark) {
      body { background-color: #09090b; color: #f4f4f5; }
    }
    .markdown-body {
      max-width: 56rem;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <article class="markdown-body prose prose-zinc dark:prose-invert">
    ${htmlContent}
  </article>
</body>
</html>
    `;

    return new Response(fullHtml, {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Render error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
