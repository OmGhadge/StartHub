# StartHub - Startup Discovery Platform

StartHub is a modern web application built with Next.js that allows users to discover, upvote, and explore startups. It features a community-driven platform where users can browse startups, see trending companies, recently funded startups, and editor picks.

## 🚀 Features

- **Startup Discovery**: Browse and search through a curated list of startups
- **Upvoting System**: Users can upvote their favorite startups
- **Authentication**: Google and GitHub OAuth integration
- **Real-time Updates**: Live updates using Sanity's real-time features
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **Content Management**: Sanity CMS integration for managing startup data
- **Editor Picks**: Curated selection of promising startups
- **Funding Information**: Track startup funding rounds and amounts
- **User Profiles**: User authentication and profile management

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js v5
- **CMS**: Sanity v3
- **Database**: Sanity (Headless CMS)
- **UI Components**: Radix UI + Custom Components
- **Markdown**: Markdown support for startup descriptions
- **TypeScript**: Full TypeScript support
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- Sanity account and project
- Google OAuth credentials
- GitHub OAuth credentials

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/OmGhadge/StartHub.git
cd starthub
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-08
SANITY_WRITE_TOKEN=your_sanity_write_token

# Authentication
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret

# NextAuth
AUTH_SECRET=your_nextauth_secret_key
```

### 4. Sanity Setup

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Configure your Sanity project with the schema types in `sanity/schemaTypes/`
3. Set up your dataset and API tokens
4. Update the environment variables with your Sanity project details

### 5. OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 6. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
g-combinator/
├── app/                    # Next.js App Router
│   ├── (root)/            # Main application routes
│   ├── api/               # API routes
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── sanity/               # Sanity CMS configuration
│   ├── schemaTypes/      # Content schemas
│   ├── lib/              # Sanity utilities
│   └── ...               # Sanity config files
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typegen` - Generate Sanity TypeScript types

## 🎨 Features in Detail

### Startup Management
- Create and manage startup profiles
- Upload startup images and descriptions
- Track funding rounds and amounts
- Categorize startups by industry

### User Authentication
- Google OAuth integration
- GitHub OAuth integration
- User profile management
- Session management

### Content Management
- Sanity Studio for content management
- Real-time content updates
- Markdown support for rich text
- Image optimization

### Community Features
- Upvoting system
- User profiles
- Startup discovery
- Trending startups

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Check the [Sanity documentation](https://www.sanity.io/docs)
3. Check the [NextAuth.js documentation](https://next-auth.js.org)
4. Open an issue in this repository

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- CMS powered by [Sanity](https://sanity.io)
- Authentication by [NextAuth.js](https://next-auth.js.org)
- UI components from [Radix UI](https://www.radix-ui.com)
