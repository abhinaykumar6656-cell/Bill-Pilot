# Bill Pilot

An intelligent bill analysis and management platform with AI-powered insights, OCR processing, and natural language querying.

## Features

- **Bill Upload & OCR**: Upload bills via images/PDFs with automatic text extraction
- **AI Analysis**: Automated anomaly detection, cost predictions, and spending insights
- **Natural Language Assistant**: Chat with your bills using natural language queries
- **Multi-format Support**: Handle electricity, water, gas, and internet bills
- **Historical Comparisons**: Track spending patterns over time
- **Multilingual Support**: Process bills in multiple languages

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation and settings management
- **Tesseract OCR** - Optical character recognition
- **LangChain** - LLM orchestration for AI agents

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization

## Project Structure

```
Bill_Pilot/
├── backend/
│   ├── app/
│   │   ├── agents/           # AI agent orchestration
│   │   ├── api/              # REST API routes
│   │   ├── core/             # Configuration, security, logging
│   │   ├── database/         # Database models and connections
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── service/          # Business logic services
│   │   └── main.py           # FastAPI application entry
│   ├── requirements.txt
│   └── tests/
└── frontend/
    ├── app/                  # Next.js App Router pages
    ├── lib/                  # Utility functions
    ├── public/               # Static assets
    └── package.json
```

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Tesseract OCR installed

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Configure environment variables
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `.env` in backend directory:

```env
DATABASE_URL=sqlite:///./bills.db
OPENAI_API_KEY=your_openai_key
TESSERACT_PATH=/usr/bin/tesseract
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bills/upload` | Upload and process bill |
| GET | `/api/bills` | List all bills |
| GET | `/api/bills/{id}` | Get bill details |
| POST | `/api/analysis/analyze` | Run AI analysis |
| POST | `/api/assistant/chat` | Chat with assistant |
| GET | `/api/predictions/{bill_id}` | Get cost predictions |
| POST | `/api/inquiries` | Create natural language query |

## Development

### Running Tests

```bash
# Backend
cd backend && pytest

# Frontend
cd frontend && npm run lint
```

### Database Migrations

```bash
cd backend
alembic upgrade head
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
