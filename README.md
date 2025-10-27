# Axelarscan Documentation

Documentation website for [Axelarscan](https://github.com/axelarnetwork/axelarscan-ui) built with Next.js and MDX.

## Prerequisites

- Node.js >= 20.0.0
- npm

## Development

```bash
npm ci
npm run dev
```

Runs on [localhost:3000](http://localhost:3000)

## Build & Deploy

```bash
npm run build
npm start
```

### Vercel Deployment

The project is configured for Vercel deployment with branch-based builds:

- `main` branch: Production deployments
- `feat/*` branches: Preview deployments
- Other branches: Builds are skipped

Deployment script: `vercel.deployment.sh`

## Project Structure

- `src/app/` - Next.js app router pages (MDX files)
- `src/components/` - React components
- `src/lib/` - Utility functions
- `src/mdx/` - MDX processing configuration
- `src/styles/` - Tailwind CSS styles

## Features

- Interactive API documentation with live examples
- MDX-based content with React components
- Search functionality
- Dark/light theme support
- Responsive design

## MDX Usage

This project uses MDX (Markdown + JSX) for content creation, allowing React components to be embedded directly in markdown files.

### Writing Content

Create `.mdx` files in `src/app/` directories to add new pages:

```mdx
# Page Title

Regular markdown content here.

<Methods />
<CodePanel>
  <Code language="javascript">
    console.log('Hello World')
  </Code>
</CodePanel>
```

### Available Components

- `<Methods />` - Interactive API method documentation
- `<CodePanel>` - Code block container with syntax highlighting
- `<Code>` - Syntax-highlighted code blocks
- `<Properties>` - Parameter documentation
- `<Property>` - Individual parameter details
- `<Tag>` - Styled tags for labels
- `<Button>` - Interactive buttons
- `<Environment>` - Environment selector

### MDX Configuration

- **Remark plugins**: `src/mdx/remark.mjs` - Markdown processing
- **Rehype plugins**: `src/mdx/rehype.mjs` - HTML processing  
- **Recma plugins**: `src/mdx/recma.mjs` - JavaScript processing
- **Search**: `src/mdx/search.mjs` - Search index generation