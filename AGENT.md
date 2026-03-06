# Agent Instructions

## Overview
This document provides guidelines for code agents working on this project.

## Project Structure
- **Source Code**: Located in `src/` directory
- **Public Assets**: Located in `public/` directory
- **Configuration**: `next.config.ts`, `tsconfig.json`, etc.

## Coding Standards
- Follow TypeScript best practices
- Use consistent indentation (2 spaces)
- Write clear, descriptive commit messages
- Include tests for new features
- Document complex logic with comments

## Workflow
1. Always create a new branch for changes
2. Make small, focused commits
3. Test changes locally before pushing
4. Create pull requests for review
5. Address review feedback promptly

## Environment
- Node.js version: See `.nvmrc` or `package.json`
- Framework: Next.js
- Package manager: pnpm

## Common Tasks
- **Adding a component**: Place in `src/components/`
- **Adding a model**: Place in `src/models/`
- **Adding a utility**: Place in `src/utils/`
- **Adding a page**: Place in `src/app/`

## Testing
- Run tests with: `pnpm test`
- Ensure all tests pass before committing
- Add tests for new functionality

## Documentation
- Update `README.md` for significant changes
- Add comments for complex logic
- Keep `API_DOCUMENTATION.md` up to date

## Security
- Never commit secrets or API keys
- Use environment variables for sensitive data
- Follow OWASP guidelines for web security
- **NEVER read, access, or disclose secrets or environment variables containing sensitive information**
- **NEVER log, print, or expose credentials, API keys, or other sensitive data**

## Performance
- Optimize images and assets
- Use code splitting for large components
- Minimize bundle size
- Implement lazy loading where appropriate