# Cover Letter Generator

AI-powered cover letter generator built with React, Vite, and Chakra UI.

## Features

- Generate personalized cover letters from job URLs
- Generate cover letters from job descriptions
- Support for PDF and DOCX resume files
- Clean, modern UI with Chakra UI
- OpenAI GPT integration for high-quality letter generation

## Setup

1. Clone the repository:
```bash
git clone https://github.com/alibaysarov/ai-cover-letter.git
cd ai-cover-letter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Open the application in your browser
2. Choose between two tabs:
   - **URL Tab**: Enter a job posting URL and optionally upload your resume
   - **Description Tab**: Enter job title and paste the job description
3. Click "Generate Cover Letter"
4. Download or copy the generated letter

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **AI**: OpenAI GPT-3.5-turbo
- **File Processing**: pdf-parse for PDF reading

## Project Structure

```
src/
├── components/          # React components
│   ├── UrlTab.tsx      # URL input tab
│   └── DescriptionTab.tsx # Description input tab
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── openai.ts       # OpenAI API client
│   └── fileReader.ts   # File reading utilities
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

This project follows:
- TypeScript strict mode
- ESLint configuration
- Prettier code formatting
- Functional React components with hooks
- Chakra UI design system

## API Usage

The application uses OpenAI's GPT-3.5-turbo model to generate personalized cover letters. Each request includes:
- Job information (URL or description)
- Resume content (if provided)
- Professional writing instructions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
