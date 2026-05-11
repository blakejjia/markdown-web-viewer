# API Documentation: Markdown Web Viewer

This project provides a simple and fast way to render Markdown documents into styled, static HTML.

## 1. POST Rendering API

Render a raw Markdown string directly into a complete, styled HTML document.

- **Endpoint**: `/api/render`
- **Method**: `POST`
- **Content-Type**: `text/plain` or `application/x-www-form-urlencoded`

### Request Body
The raw Markdown text you want to render.

### Response
- **Content-Type**: `text/html; charset=utf-8`
- **Success (200 OK)**: Returns a complete HTML5 document including:
  - Responsive layout (max-width 56rem).
  - Tailwind Typography (Prose) styling.
  - Automatic light/dark mode support based on system settings.
  - Images converted to clickable links (🖼️ View Image).
  - Syntax highlighting for code blocks.
- **Error (400 Bad Request)**: If no content is provided in the body.
- **Error (500 Internal Server Error)**: If rendering fails.

### Example Usage (cURL)
```bash
curl -X POST -H "Content-Type: text/plain" \
     -d "# Hello World\nThis is **bold** and this is an [image](https://example.com/a.jpg)" \
     https://your-domain.com/api/render
```

---

## 2. GET Viewer Interface

View a remote Markdown file by providing its URL.

- **URL**: `/viewer`
- **Method**: `GET`
- **Parameters**:
  - `md` (required): The URL-encoded link to a raw `.md` file.

### Example Usage
```text
https://your-domain.com/viewer?md=https://raw.githubusercontent.com/user/repo/main/README.md
```

---

## Technical Features (Static Mode)

The system currently operates in a **Pure Static Mode**:
- **Zero Client-Side JS**: The rendered output is purely HTML/CSS.
- **Image Handling**: All `<img>` tags are automatically transformed into `<a>` tags to prevent heavy image loading and provide a clean document view.
- **Styling**: Uses Tailwind CSS via CDN in the API response for zero-config integration.
- **Security**: Uses `remark` and `rehype` for safe and standardized parsing.
