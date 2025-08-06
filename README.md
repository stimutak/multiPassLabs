# MultiPass Labs

Custom e-commerce and art platform showcasing Oliver's artwork, music, and interactive experiences.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or use SQLite for development)
- Stripe account (for payments functionality)
- Optional: AWS S3 or Cloudinary (for file storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/stimutak/multiPassLabs.git
cd multiPassLabs
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
- Database connection string
- NextAuth secret and URL
- Stripe API keys
- Storage credentials (AWS S3 or Cloudinary)
- Email service credentials

4. **Set up the database**
```bash
npm run db:push  # Push schema to database
npm run db:seed  # Optional: seed with test data
```

5. **Start development server**
```bash
npm run dev
```

Visit [http://localhost:3002](http://localhost:3002)

The site will display a loading screen with animated rings and then redirect to `/en` for English.

## 📦 Key Dependencies

### Core
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.1** - UI library
- **TypeScript 5.9.2** - Type safety

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS (Note: v4 not compatible)
- **@tailwindcss/forms** - Form styling
- **@tailwindcss/typography** - Typography plugin

### State & Data
- **@reduxjs/toolkit** - State management
- **Prisma 6.13.0** - Database ORM
- **next-intl 4.3.4** - Internationalization

### UI Components
- **@radix-ui/react-slot** - Component composition
- **class-variance-authority** - Variant management
- **clsx & tailwind-merge** - Class utilities

### Authentication & Payments
- **next-auth 4.24.11** - Authentication
- **Stripe 18.4.0** - Payment processing

## ⚠️ Known Issues & Solutions

### Port Configuration
- Default port: **3002** (configurable in package.json)
- If port is in use, kill the process: `lsof -ti:3002 | xargs kill -9`

### Tailwind CSS Version
- Must use Tailwind CSS v3 (v4 has breaking changes)
- PostCSS config uses standard `tailwindcss` plugin

### Next.js 15 Compatibility
- Async params in layouts require proper handling
- Server components use `getTranslations` instead of `useTranslations`

## 📁 Project Structure

```
multiPassLabs/
├── app/                    # Next.js 14 App Router
│   ├── [locale]/          # Internationalized routes
│   └── api/               # API routes
├── components/            # Reusable components
├── lib/                   # Core utilities
├── store/                # Redux store
├── styles/               # Global styles
├── locales/              # Translation files
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
```

### Code Quality
```bash
npm run lint        # Run ESLint
npm run format      # Format with Prettier
npm run typecheck   # TypeScript type checking
```

### Testing
```bash
npm run test        # Run unit tests
npm run test:watch  # Run tests in watch mode
npm run e2e         # Run end-to-end tests
```

### Database
```bash
npm run db:push     # Push schema to database
npm run db:migrate  # Run migrations
npm run db:studio   # Open Prisma Studio
```

## 🌍 Internationalization

The platform supports multiple languages (currently English and Spanish). All text must use translation keys:

```tsx
const t = useTranslations('common');
return <Button>{t('submit')}</Button>;
```

## 🎨 Features

- **Art Gallery**: Showcase artwork with immersive viewing experience
- **Music Platform**: Audio playback and reactive visualizations
- **E-commerce**: Full shopping cart and Stripe checkout
- **Interactive Experiences**: Three.js and p5.js integrations
- **Admin Panel**: Content management for products and orders
- **Internationalization**: Multi-language support
- **Authentication**: Secure user accounts with NextAuth.js
- **Responsive Design**: Mobile-first approach

## 🔒 Security

- All user input is sanitized
- SQL queries use Prisma ORM (parameterized)
- Authentication required for protected routes
- Environment variables for sensitive data
- Stripe webhooks verification
- CSRF protection enabled

## 📚 Documentation

- [CLAUDE.md](./CLAUDE.md) - AI assistant guidelines and project constraints
- [AGENTS.md](./AGENTS.md) - Specialized AI agent documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)

## 🧪 Testing

The project uses Jest for unit tests and Playwright for E2E tests:

```bash
npm run test           # Run all unit tests
npm run test:coverage  # Generate coverage report
npm run e2e            # Run E2E tests
npm run e2e:ui         # Run E2E tests with UI
```

## 🚀 Deployment

### Environment Variables Required

See `.env.example` for the complete list of required environment variables.

### Deployment Options

1. **Vercel** (Recommended)
   - Connect GitHub repository
   - Configure environment variables
   - Deploy automatically on push

2. **Railway**
   - Deploy with PostgreSQL database
   - Configure environment variables
   - Automatic deployments

## 📝 Contributing

1. Read [CLAUDE.md](./CLAUDE.md) for coding guidelines
2. Create a feature branch
3. Make changes following project constraints
4. Ensure all tests pass
5. Submit pull request

### Important Guidelines
- Never create "enhanced" versions of files
- Modify existing files instead of creating duplicates
- All text must use translation keys
- Test on mobile devices
- Follow security best practices

## 📄 License

ISC License - See LICENSE file for details

## 🤝 Support

For issues and questions:
- Create an issue on [GitHub](https://github.com/stimutak/multiPassLabs/issues)
- Check [CLAUDE.md](./CLAUDE.md) for development guidelines
- Review [AGENTS.md](./AGENTS.md) for AI agent usage

---

Built with ❤️ for showcasing art, music, and interactive experiences.