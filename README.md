# ToS Summarizer

An AI-powered Terms of Service analyzer that provides intelligent summaries, identifies high-risk clauses, and highlights privacy concerns in legal documents.

## 🚀 Features

- **AI-Powered Analysis**: Uses GPT-4o to analyze and summarize Terms of Service documents
- **Smart PDF Processing**: Extracts and processes text from PDF files
- **Risk Assessment**: Identifies and categorizes clauses by risk level (High, Medium, Low)
- **Privacy Focus**: Highlights sections dealing with user data collection, tracking, and third-party sharing
- **Full Document View**: View complete Terms of Service with easy navigation
- **Document Management**: Automatic cleanup of processed documents
- **User Authentication**: Secure 2 factor authentication flow before document analysis

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chirschbrich/ToS-Summarizer.git
   cd ToS-Summarizer
   ```

2. **Install dependencies**
   ```bash
   npm i
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=xxxxx
   ```

## Running the Project

The application requires two servers to run simultaneously:

### Terminal 1: Backend Server (Port 3001)
```bash
npm start
```
This starts the Express server that handles PDF uploads and AI processing.

### Terminal 2: Frontend Development Server (Port 3000)
```bash
npm run dev
```
### Accessing the Application

Once both servers are running, open your browser and navigate to:
```
http://localhost:3000
```

### PDF Processing Issues
- Ensure the PDF is text-based (not scanned images)

## Acknowledgments

- Original design from [Figma Wireframes](https://www.figma.com/design/5UniLFVSegnoljwSkSTX8H/ToS-Summarizer-Wireframes)
- Powered by OpenAI's GPT-4o model
- UI components from Radix UI and shadcn/ui