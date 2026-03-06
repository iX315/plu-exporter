# PLU Exporter

A Google Drive based CMS for quick restaurant menu creation. This Next.js application fetches menu data from Google Sheets and displays it in a responsive, print-ready format.

## Features

- Multi-language support
- Allergen information display
- Responsive design with print optimization
- Google Sheets integration
- Custom theming support

## Prerequisites

- Node.js v18+ (recommended: v20+)
- pnpm (package manager)
- Google Cloud Project with Sheets API enabled
- Google Service Account credentials

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/plu-exporter.git
cd plu-exporter
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Sheets Configuration
SHEET_ID="Your Google Sheet ID"
CREDENTIALS="Base64 encoded service account credentials JSON"

# Application Configuration
NEXT_PUBLIC_CUSTOM_THEME_URL="URL to custom CSS file (optional)"
NEXT_PUBLIC_LANGUAGES="en,de,it"  # Comma-separated language codes

# Security (optional)
TOTP_SECRET="Your secret for API authentication"
```

#### How to get Google Sheets credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Google Sheets API"
4. Create a service account and download the JSON credentials file
5. Encode the JSON file to base64: `base64 credentials.json`
6. Share your Google Sheet with the service account email

### 4. Set up your Google Sheet

Your Google Sheet should have two sheets:

- **Menu**: Contains product data with these columns:
  - plu (number)
  - group (string)
  - name (string)
  - image (string - filename)
  - allergies (string)
  - details (string)
  - description (string)
  - size (string)
  - price (string)
  - page (number)
  - language (string - language code)

- **Groups**: Contains group data with these columns:
  - name (string)
  - description (string)
  - pre (string)
  - post (string)
  - page (number)
  - language (string - language code)

## Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Production

### Build

```bash
pnpm build
```

### Start

```bash
pnpm start
```

## API Endpoints

### GET `/api/data`

Returns menu data in JSON format.

**Response:**
```json
{
  "values": [
    {
      "group": {
        "name": "string",
        "description": "string",
        "pre": "string",
        "post": "string",
        "page": number,
        "language": "string"
      },
      "products": [
        {
          "plu": number,
          "group": "string",
          "name": "string",
          "image": "string",
          "allergies": "string",
          "details": "string",
          "description": "string",
          "size": "string",
          "price": "string",
          "page": number,
          "language": "string"
        }
      ]
    }
  ]
}
```

## Customization

### Theming

Add your custom CSS file and set `NEXT_PUBLIC_CUSTOM_THEME_URL` to override default styles.

### Languages

Configure supported languages via `NEXT_PUBLIC_LANGUAGES` environment variable.

## Deployment

### Vercel (Recommended)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Add environment variables in project settings
4. Deploy

### Other platforms

The app can be deployed to any Node.js hosting platform:
- Add build command: `pnpm build`
- Add start command: `pnpm start`
- Set all required environment variables

## Project Structure

```
src/
├── app/              # Next.js app router
│   ├── api/          # API routes
│   └── [lang]/       # Language-specific pages
├── components/       # React components
├── models/           # Data models and types
├── styles/           # Global styles
└── utils/            # Utility functions
```

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Create production build
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm format`: Format code with Prettier

## License

MIT
