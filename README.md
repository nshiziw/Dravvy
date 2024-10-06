# Dravvy - Professional Resume Builder

A modern, feature-rich resume builder application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📝 Multi-step resume creation process
- 🎨 Multiple resume themes and styling options
- 📱 Fully responsive design
- 🔄 Real-time preview
- 💾 Automatic saving of progress
- 📤 Export to PDF and DOCX formats
- ✨ Beautiful UI with smooth animations
- 🔒 Form validation and error handling
- 🌐 SEO optimized

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **UI Components:** Radix UI
- **Testing:** Jest + React Testing Library
- **PDF Generation:** @react-pdf/renderer
- **DOCX Generation:** docx

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nshiziw/dravvy.git
   cd dravvy
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dravvy/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   ├── store/           # Zustand store
│   ├── types/           # TypeScript type definitions
│   └── test/            # Test utilities and setup
├── public/              # Static files
└── scripts/             # Build and deployment scripts
```

## Testing

Run the test suite:

```bash
npm test          # Run all tests
npm test:watch    # Run tests in watch mode
npm test:coverage # Run tests with coverage report
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
