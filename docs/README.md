# Hero Rabbit Documentation

This directory contains the complete documentation for the Hero Rabbit Chrome Extension, built with [Nextra](https://nextra.site).

## 🚀 Getting Started

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start
```

### Building

```bash
# Build static site
pnpm run build

# Export static files
pnpm run export
```

## 📁 Structure

```
docs/
├── content/                 # Documentation content (MDX files)
│   ├── index.mdx          # Home page
│   ├── installation.mdx   # Installation guide
│   ├── features.mdx       # Features overview
│   ├── configuration.mdx  # Configuration guide
│   ├── troubleshooting.mdx # Troubleshooting guide
│   ├── development.mdx    # Development guide
│   └── privacy_policy.mdx # Privacy policy
├── public/                 # Static assets
├── _meta.json             # Sidebar navigation
├── theme.config.tsx       # Theme configuration
├── next.config.mjs        # Next.js configuration
└── mdx-components.js      # Custom MDX components
```

## 🎨 Customization

### Theme Configuration

Edit `theme.config.tsx` to customize:

- Colors and branding
- Navigation and sidebar
- Search functionality
- Footer and links

### MDX Components

The documentation uses Nextra's built-in components:

- `<Callout>` - Info, warning, and error boxes
- `<Cards>` - Feature and information cards
- `<Steps>` - Step-by-step instructions
- `<Tabs>` - Tabbed content sections
- `<Collapse>` - Expandable content sections

### Styling

- Uses Tailwind CSS for styling
- Responsive design for all devices
- Dark/light mode support
- Custom color scheme

## 📝 Writing Documentation

### MDX Format

- Use Markdown syntax for basic formatting
- Import and use Nextra components for enhanced UI
- Include proper frontmatter with title and description
- Use descriptive headings and clear structure

### Content Guidelines

- Write clear, concise explanations
- Include code examples where helpful
- Use screenshots and images for visual clarity
- Keep content up-to-date with the extension

### Adding New Pages

1. Create new `.mdx` file in `content/` directory
2. Add frontmatter with title and description
3. Update `_meta.json` for navigation
4. Include in appropriate section of sidebar

## 🔧 Configuration

### Next.js Configuration

- Static export enabled for GitHub Pages
- Base path configuration for deployment
- Image optimization disabled for static export
- MDX processing with custom components

### Search Configuration

- Full-text search enabled
- Indexes all documentation content
- Fast search with Pagefind integration
- Customizable search placeholder

## 🚀 Deployment

### GitHub Pages

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Local Testing

```bash
# Build and test locally
pnpm run build
pnpm run start

# Test static export
pnpm run export
```

## 🤝 Contributing

### Documentation Improvements

1. Fork the repository
2. Make your changes
3. Test locally with `pnpm run dev`
4. Submit a pull request

### Content Guidelines

- Follow existing style and format
- Use clear, professional language
- Include examples and screenshots
- Keep content accurate and up-to-date

## 📚 Resources

- [Nextra Documentation](https://nextra.site)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)
- [Tailwind CSS](https://tailwindcss.com)

## 🐛 Issues

Found an issue with the documentation? Please [open an issue](https://github.com/vanascimento/herorabbit/issues) on GitHub.

---

Built with ❤️ by the Hero Rabbit team
