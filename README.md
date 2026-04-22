# 📝 Modern Markdown Web Viewer

A sleek, high-performance, and feature-rich Markdown viewer built with **Next.js 15+** and **React**. Designed for readability and professional documentation presentation.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

## ✨ Key Features

- **🚀 Server-Side Rendering**: Instant loading with Next.js App Router and Suspense.
- **📊 GFM Support**: Full support for GitHub Flavored Markdown, including beautifully styled tables and task lists.
- **🔍 Image Lightbox**: Interactive full-screen image preview with glassmorphism effects and smooth transitions.
- **💾 Direct Download**: One-click button to download images directly from the lightbox.
- **📍 Smart Navigation**: Left-aligned, sticky Table of Contents (ToC) for easy document browsing.
- **🎨 Premium UI**: Modern aesthetic with Geist typography, subtle gradients, and dark mode support.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown)
- **Markdown Plugins**: `remark-gfm`, `rehype-raw`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/markdown-web-viewer.git
cd markdown-web-viewer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📖 Usage

The viewer fetches Markdown content via a URL parameter. You can use it by navigating to:

`http://localhost:3000/viewer?md=YOUR_MARKDOWN_URL`

**Example:**
`http://localhost:3000/viewer?md=https://raw.githubusercontent.com/unicode-org/cldr/master/README.md`

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
