# Family Birthday Reminder Tool

A web application to help families remember and celebrate birthdays together.

## Features

✅ **User Authentication** - Secure signup and login
✅ **Birthday Management** - Add and track family birthdays
✅ **Smart Reminders** - Get notified before important dates
✅ **Quote Wall** - Share and discover birthday wishes
✅ **Like System** - Engage with community quotes

## Tech Stack

- **Frontend:** Next.js 15 + React + TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite (better-sqlite3)
- **Authentication:** bcryptjs

## Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/          # API routes
│   ├── dashboard/    # Dashboard page
│   ├── login/        # Login page
│   └── signup/       # Signup page
├── lib/
│   ├── db.ts         # Database setup
│   ├── types.ts      # TypeScript types
│   └── reminders.ts  # Reminder utilities
└── docs/             # Documentation
```

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/birthdays` - Get birthdays
- `POST /api/birthdays` - Add birthday
- `GET /api/quotes` - Get quotes
- `POST /api/quotes` - Add quote
- `POST /api/quotes/[id]/like` - Like a quote

## License

MIT
