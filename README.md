# Pokémon Team Optimisation Engine

A full-stack web application that allows users to build Pokémon teams, analyse type matchups, and receive data-driven recommendations for improving team balance and coverage.

The application combines a custom type-matchup engine, a weighted recommendation algorithm, AI-generated team summaries, and real-time PokéAPI integration to create an interactive competitive team-building experience.

---

# Features

## Team Building

* Search and add Pokémon using PokéAPI
* Build teams of up to 6 Pokémon
* Remove and modify team members dynamically
* View Pokémon sprites and type information

## Team Analysis

* Defensive weakness analysis
* Resistance and immunity breakdowns
* Offensive coverage analysis
* 4× weakness detection
* Coverage gap identification

## Recommendation Engine

* Weighted recommendation algorithm
* Dynamically evaluates hundreds of Pokémon candidates
* Scores candidates based on:

  * Defensive synergy
  * Offensive coverage improvement
  * Type overlap penalties
  * Severe weakness penalties
  * Base stat weighting
* Returns ranked Pokémon recommendations with reasoning

## AI Integration

* AI-generated strategic team summaries
* Summarises strengths, weaknesses, and improvement opportunities
* Integrated directly into the recommendation dashboard

## Authentication & Database

* User registration and login
* JWT authentication
* Password hashing with bcrypt
* MongoDB database integration
* Save and manage Pokémon teams
* Protected API routes and frontend routes

## UI / UX

* Modern dark dashboard aesthetic
* Responsive layout
* Dynamic glowing type cards
* Interactive recommendation cards
* Glassmorphism-inspired design system

---

# Tech Stack

## Frontend

* React
* React Router
* Axios
* CSS3

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## APIs & External Services

* PokéAPI
* OpenAI API

---

# System Architecture

## Frontend

The frontend is built using React and is responsible for:

* Team building UI
* Rendering analysis dashboards
* Authentication flows
* Saving and managing teams
* Communicating with backend APIs

## Backend

The backend handles:

* Team analysis logic
* Recommendation algorithm processing
* Authentication
* MongoDB persistence
* AI summary generation
* PokéAPI data processing and caching

## Database

MongoDB stores:

* Users
* Saved teams
* Team analysis snapshots

---

# Recommendation Algorithm

The recommendation engine ranks potential Pokémon additions using a weighted scoring algorithm that evaluates both defensive synergy and offensive coverage.

For each candidate Pokémon, the system analyses how it interacts with the current team’s identified weaknesses and gaps.

The algorithm:

* Rewards resistances and immunities to team weaknesses
* Penalises new weaknesses and severe 4× weaknesses
* Rewards candidates that improve offensive coverage
* Applies penalties for redundant type overlap
* Uses base stat totals as an additional weighting factor

Each candidate is assigned a normalised score out of 100 along with reasoning explaining:

* Which weaknesses it fixes
* What coverage it adds
* What new risks it introduces

The backend dynamically evaluates large candidate sets using PokéAPI data and in-memory caching.

---

# AI Summary System

The application integrates OpenAI to generate concise strategic summaries for teams.

The AI system analyses:

* Defensive weaknesses
* Offensive coverage gaps
* Existing recommendations
* Team structure and synergy

It then produces a natural-language summary explaining the team’s major strengths, risks, and potential improvements.

---

# Caching Strategy

To improve performance, Pokémon candidate data is cached in memory on the backend.

The first analysis request fetches and processes Pokémon data from PokéAPI, while subsequent requests reuse the cached dataset to significantly reduce API calls and response times.

---

# Authentication Flow

Authentication uses JWT-based sessions.

## Registration

* User credentials are validated
* Passwords are hashed using bcrypt
* JWT token is generated and returned

## Login

* Credentials are verified
* JWT token is issued upon successful login

## Protected Routes

Protected backend and frontend routes ensure only authenticated users can:

* Save teams
* View saved teams
* Delete saved teams

---

# Project Structure

```txt
pokemon-team-optimiser/
├── backend/
│   ├── config/
│   ├── data/
│   ├── logic/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd pokemon-team-optimiser
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Future Improvements

* Public team sharing
* Team comparison system
* Move-set and ability analysis
* Competitive meta integration
* Advanced stat optimisation
* Deployment and cloud hosting
* Persistent cached Pokémon database
* Real-time collaborative team building

---

# Resume Highlights

* Built a full-stack web app that allows users to create Pokémon teams and analyse weaknesses, resistances, and offensive coverage using a custom type-matchup engine.

* Developed a weighted recommendation algorithm that suggests optimal Pokémon additions by scoring candidates on defensive synergy, offensive coverage, type overlap penalties, and base stats.

* Integrated PokéAPI with backend caching to evaluate large candidate sets efficiently and deliver real-time insights alongside AI-generated team summaries.

---

# Author

Brandon Wong
