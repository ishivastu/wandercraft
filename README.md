# 🌍 WanderCraft — AI Dynamic Trip Planner

> An AI-powered dynamic trip planner built with **Next.js** and the **Google Gemini API**, generating personalized travel itineraries with persistent trip management, expense tracking, caching, and interactive geospatial mapping.

---

## 🚀 Live Demo

**Live Website:** [View WanderCraft](https://wandercraft-three.vercel.app/)

**GitHub Repository:** [WanderCraft](https://github.com/ishivastu/wandercraft)

---

## ✨ Features

### 🤖 AI-Powered Trip Planning

* Generates personalized travel itineraries using the **Google Gemini API**.
* Uses structured JSON schemas for reliable AI-generated responses.
* Takes multiple trip parameters into account to create customized plans.
* Dynamically renders generated itinerary data in the application.

### ⚡ Smart Performance Caching

* Integrated **Upstash Redis** for caching repeated AI request patterns.
* Reduces unnecessary Gemini API calls.
* Improves response latency for repeated or similar requests.
* Helps reduce AI API quota usage.

### 💰 Persistent Trip & Expense Management

* Stores generated trips using **MongoDB** and **Mongoose**.
* Allows users to persist their travel plans.
* Supports expense tracking for individual trips.
* Uses dynamic trip IDs for managing individual trip data.

### 🗺️ Interactive Maps

* Integrated **Leaflet** for interactive geospatial visualization.
* Displays trip activities and locations on a map.
* Provides a visual representation of the generated travel route.

### 📱 Responsive Modern UI

* Built with **Next.js App Router** and **React**.
* Styled using **Tailwind CSS**.
* Responsive layout for different screen sizes.
* Uses dynamic state management for multiple application tabs and trip sections.

---

## 🛠️ Tech Stack

| Category   | Technologies                |
| ---------- | --------------------------- |
| Framework  | Next.js                     |
| Frontend   | React, Tailwind CSS         |
| Mapping    | Leaflet                     |
| Backend    | Next.js API Routes, Node.js |
| AI / LLM   | Google Gemini API           |
| Database   | MongoDB, Mongoose           |
| Caching    | Upstash Redis               |
| Deployment | Vercel                      |
| Language   | JavaScript                  |

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │      User           │
                         │   Web Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Next.js        │
                         │   React Frontend    │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │   Next.js API       │
                         │      Routes         │
                         └──────┬───────┬──────┘
                                │       │
                  ┌─────────────┘       └──────────────┐
                  ▼                                    ▼
        ┌───────────────────┐                ┌──────────────────┐
        │   Google Gemini   │                │     MongoDB      │
        │    AI API         │                │    + Mongoose    │
        └─────────┬─────────┘                └──────────────────┘
                  │
                  ▼
        ┌───────────────────┐
        │   Upstash Redis   │
        │      Cache        │
        └───────────────────┘

                         ┌──────────────────┐
                         │     Leaflet      │
                         │  Interactive Map │
                         └──────────────────┘
```

---

## 📂 Project Structure

```text
wandercraft/
│
├── app/
│   ├── api/
│   │   ├── generate-trip/
│   │   │   └── route.js
│   │   │
│   │   └── trips/
│   │       ├── [id]/
│   │       │   └── route.js
│   │       │
│   │       └── save/
│   │           └── route.js
│   │
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── lib/
│   ├── gemini.js
│   ├── mongodb.js
│   └── redis.js
│
├── models/
│   └── Trip.js
│
├── public/
│   └── ...
│
├── .env
├── .gitignore
├── jsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔄 How It Works

### 1. Enter Trip Details

The user provides the required travel information such as destination, duration, preferences, and other trip parameters.

### 2. AI Trip Generation

The frontend sends the request to the Next.js API.

The API communicates with the **Google Gemini API** and generates a structured itinerary.

### 3. Redis Caching

Before making unnecessary repeated AI requests, the application checks the **Upstash Redis** cache.

If a matching cached response exists, it can be reused instead of generating the same response again.

### 4. Store Trip

Generated trip information can be persisted in **MongoDB** through Mongoose models.

### 5. Explore the Trip

The frontend displays:

* Daily itinerary
* Activities
* Locations
* Travel information
* Expenses
* Interactive map

### 6. Track Expenses

Users can add and manage expenses associated with individual trips.

---

## 🧠 AI Integration

WanderCraft uses the **Google Gemini API** to generate structured travel itineraries.

Instead of relying only on free-form text generation, the application uses structured output so that the generated response can be consumed directly by the frontend.

Conceptually:

```text
User Trip Preferences
        │
        ▼
Next.js API Route
        │
        ▼
Redis Cache Check
        │
        ├── Cache Hit ──────► Return Cached Trip
        │
        └── Cache Miss
                │
                ▼
          Google Gemini
                │
                ▼
        Structured JSON
                │
                ▼
          Store / Return
                │
                ▼
          React UI
```

---

## ⚡ Redis Caching

WanderCraft integrates **Upstash Redis** as a caching layer for AI-generated responses.

### Benefits

* ⚡ Faster repeated requests
* 💰 Reduced Gemini API usage
* 📉 Lower latency for cached requests
* 🔄 Reusable responses for repeated prompt patterns

The application can follow a flow similar to:

```text
Request
   │
   ▼
Generate Cache Key
   │
   ▼
Check Redis
   │
   ├── Found ──► Return Cached Response
   │
   └── Not Found
          │
          ▼
      Gemini API
          │
          ▼
      Save in Redis
          │
          ▼
      Return Response
```

---

## 🗄️ Database

MongoDB is used for persistent storage.

Mongoose provides schema definitions and database interaction.

The `Trip` model is responsible for storing trip-related information such as:

* Destination
* Trip details
* Itinerary
* Activities
* Expenses
* Generated travel information

---

## 🗺️ Interactive Mapping

WanderCraft uses **Leaflet** to provide interactive maps.

The map layer can be used to visualize:

* Travel destinations
* Activity locations
* Route points
* Geographic relationships between activities

This provides a visual alternative to viewing the itinerary only as a list.

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_google_gemini_api_key

UPSTASH_REDIS_REST_URL=your_upstash_redis_url

UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

> ⚠️ Never commit your `.env` file or expose your API keys publicly.

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
.env.local
.env.production
node_modules/
.next/
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js**
* **npm**
* **Git**
* MongoDB account/database
* Google Gemini API key
* Upstash Redis database

---

### 1. Clone the Repository

```bash
git clone https://github.com/ishivastu/wandercraft.git
```

### 2. Navigate to the Project

```bash
cd wandercraft
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file:

```bash
touch .env
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open the Application

Visit:

```text
http://localhost:3000
```

---

## 📦 Available Scripts

Depending on the scripts configured in `package.json`:

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## 🌐 Deployment

WanderCraft can be deployed using **Vercel**.

### Basic deployment flow

```text
GitHub Repository
       │
       ▼
     Vercel
       │
       ▼
Production Build
       │
       ▼
Live WanderCraft App
```

Before deploying, configure the required environment variables in your Vercel project settings:

```text
MONGODB_URI
GEMINI_API_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

Then deploy the project.

---

## 🔒 Security Considerations

* API keys are stored using environment variables.
* `.env` should never be committed to GitHub.
* Database credentials should remain private.
* API routes should validate incoming request data.
* User-controlled data should be validated before being stored in MongoDB.
* Sensitive server-side credentials should never be exposed to the client.

---

## 📈 Future Improvements

Possible future enhancements include:

* 🔐 User authentication and authorization
* 🧭 Turn-by-turn navigation
* 🌦️ Real-time weather integration
* ✈️ Flight and hotel search
* 🚆 Public transportation information
* 💱 Multi-currency expense tracking
* 📊 Trip expense analytics
* 📱 Progressive Web App support
* 🤖 More advanced AI personalization
* 🔔 Travel reminders and notifications
* 🗺️ Improved route optimization
* 👥 Collaborative trip planning

---

## 🎯 Project Goals

WanderCraft was built to explore how modern web technologies and generative AI can be combined to create a practical travel-planning application.

The project demonstrates experience with:

* Full-stack Next.js development
* React state management
* REST-style API development
* Generative AI integration
* Prompt engineering
* Structured LLM responses
* MongoDB database design
* Redis caching
* Geospatial visualization
* Responsive UI development
* Production deployment

---

## 📸 Screenshots

Add screenshots of the application here:

```text
screenshots/
├── home.png
├── trip-generation.png
├── itinerary.png
├── expenses.png
└── map.png
```

Example:

```markdown
![WanderCraft Home](./screenshots/home.png)

![AI Generated Itinerary](./screenshots/itinerary.png)

![Interactive Map](./screenshots/map.png)
```

---

## 👨‍💻 Author

**Shivastu Mishra**

Information Technology Student & Full-Stack Developer

* GitHub: [@ishivastu](https://github.com/ishivastu)

---

## 📄 License

This project is intended for educational and portfolio purposes.

If you plan to distribute or modify this project, add an appropriate open-source license such as MIT.

---

⭐ If you found WanderCraft interesting, consider giving the repository a star!
