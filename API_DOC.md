# API Documentation: Markdown Web Viewer

The Markdown Web Viewer provides a stateless way to render Markdown documents. It supports both remote file fetching and direct Base64 content rendering.

## 1. Remote URL Rendering

View a remote Markdown file by providing its URL as a query parameter.

- **URL**: `/?url=` or `/?md=`
- **Method**: `GET`
- **Priority**: This parameter takes precedence over direct content.

### Example Usage
```text
https://your-domain.com/?url=https://raw.githubusercontent.com/user/repo/main/README.md
```

## 2. Direct Base64 Rendering

Render Markdown content directly by passing a Base64-encoded string.

- **URL**: `/?content=`
- **Method**: `GET`
- **Format**: Standard Base64 or URL-safe Base64.

### Example Usage
```text
https://your-domain.com/?content=IyBIZWxsbyBXb3JsZAoKVGhpcyBpcyBtYXJrZG93biE=
```
*(The above encodes `# Hello World\n\nThis is markdown!`)*

---

## Technical Features

- **Instant Rendering**: Base64 content is decoded and rendered server-side for zero-latency display.
- **Loading States**: Remote URLs display a beautiful loading spinner while fetching.
- **Premium UI**: 
  - Responsive layout.
  - Tailwind Typography (Prose) styling.
  - Automatic light/dark mode.
  - Shiki syntax highlighting.
  - Interactive image lightbox.
  - Table of Contents.
