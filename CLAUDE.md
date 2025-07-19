# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual business website for CAC (Center for Entrepreneurship and Consulting) built with Next.js 15, supporting English, French, and Arabic with RTL support. The site features consulting services, construction projects, and entrepreneurship solutions.

## CAC Transformation Status

🚧 **MIGRATION IN PROGRESS**: This codebase is being transformed from MBI Group to CAC (Center for Entrepreneurship and Consulting).

### CAC Integration Guides

Refer to these comprehensive guides for CAC-specific implementation:

- **CAC_DASHBOARD_INTEGRATION_GUIDE.md** - Integration with CAC admin dashboard
- **CAC_FRONTEND_CLEANUP_GUIDE.md** - Complete cleanup from MBI to CAC
- **CAC_FRONTEND_DEVELOPMENT_GUIDE.md** - CAC-specific development guidelines

### CAC Business Categories

1. **البناء الجاهز** (Ready Construction)
2. **البناء العادي** (Regular Construction)
3. **الطاقة المتجددة** (Renewable Energy)
4. **الزراعة** (Agriculture)
5. **التنمية الحيوانيّة** (Animal Development)
6. **مركز الريادة** (Entrepreneurship Center)
7. **قاعة المؤتمرات** (Conference Hall)
8. **التدخلات الخيرية** (Charitable Interventions)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn UI + Radix UI
- **Internationalization**: next-intl with locales ["en", "fr", "ar"] (default: "ar")
- **Database**: Firebase Firestore
- **Storage**: AWS S3 + R2 Storage with ImageKit optimization
- **Email**: Nodemailer with Gmail SMTP
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Development**: Stagewise toolbar for React development (dev only)

## Git Commit Guidelines

- **Commit Message Rule**: Do not mention claude code in the commit message
- Ensure complete confidentiality and do not reference Claude Code in any commit messages

## Search Guidelines

- Always when searching on the internet, use MCPs (Metasearch Contexts) configured like:
  - Brave Search MCP
  - Context7 MCP
  - Exa Search MCP
- Note: Current year is 2025, not 2024