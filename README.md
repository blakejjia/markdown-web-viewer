# 📝 Modern Markdown Web Viewer

A sleek, high-performance, and feature-rich Markdown viewer built with **Next.js 15**, **React 19**, and **TypeScript**. Designed for developers and documentation lovers who crave a premium reading experience for remote Markdown files.

![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS 4](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Shiki](https://img.shields.io/badge/Syntax_Highlighting-Shiki-brightgreen?style=for-the-badge)

---

## ✨ Key Features

- **🚀 Server-Side Power**: Leverages Next.js App Router for instant loading and SEO-friendly rendering.
- **🎨 Premium Typography**: Beautifully styled using `@tailwindcss/typography` with custom refinements for headings, tables, and lists.
- **🔍 Image Lightbox**: Interactive full-screen image previews with glassmorphism effects and smooth transitions.
- **💾 Direct Download**: One-click download functionality integrated directly into the image lightbox.
- **📍 Intelligent Navigation**: Automatic Table of Contents (ToC) generation with sticky sidebar and smooth-scroll linking.
- **💻 Syntax Highlighting**: Professional-grade code block rendering powered by **Shiki** with support for dozens of languages and themes.
- **🌓 Adaptive Theme**: Seamless dark and light mode support that respects your system preferences.
- **📊 GFM Optimized**: Full support for GitHub Flavored Markdown, including task lists, strikethroughs, and advanced tables.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Suspense)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Markdown Processing**: 
  - [React Markdown](https://github.com/remarkjs/react-markdown)
  - `remark-gfm` (Tables, Tasklists, etc.)
  - `rehype-raw` (HTML in Markdown support)
- **Syntax Highlighting**: [Shiki](https://shiki.style/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/markdown-web-viewer.git
cd markdown-web-viewer
npm install
```

### 2. Development

Run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 3. Production Build

Create an optimized production build:

```bash
npm run build
npm start
```

---

## 📖 Usage

The viewer is designed to be dead-simple to use. You can either use the landing page UI or pass a URL directly.

### Method 1: Interactive UI
1. Navigate to the home page.
2. Paste any **raw** Markdown URL (e.g., from GitHub, Gist, or any CDN).
3. Click "View Markdown".

### Method 2: URL Parameters
Navigate directly to the viewer by appending the `md` query parameter:

`http://localhost:3000/viewer?md=YOUR_MARKDOWN_URL`

**Example:**
`http://localhost:3000/viewer?md=https://raw.githubusercontent.com/unicode-org/cldr/master/README.md`

---

## 📂 Project Structure

```text
src/
├── app/               # Next.js App Router pages
│   ├── viewer/        # Markdown viewer page with dynamic fetching
│   └── page.tsx       # Landing page with URL input
├── components/        # Reusable UI components
│   ├── MarkdownRenderer.tsx  # Core Markdown logic & Lightbox
│   └── CodeBlock.tsx         # Shiki-powered syntax highlighting
└── layout/            # Layout components (future expansion)
```

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork** the repository.
2. **Clone** your fork (`git clone ...`).
3. **Branch** off for your feature (`git checkout -b feat/my-new-feature`).
4. **Commit** your changes (`git commit -m 'Add some feature'`).
5. **Push** to your branch (`git push origin feat/my-new-feature`).
6. **Open a Pull Request**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using Next.js and Tailwind CSS.
</p>
