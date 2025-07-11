# 🎯 Assignment: Reactive API Console via Chat Interface

## 💡 Concept

Build a **reactive API explorer tool** where users can:

1. Choose from a list of public APIs (e.g. Weather, Joke API, GitHub users)
2. Use a **chat-style interface** to issue commands  
   (e.g. `get weather in Tokyo`, `search users john`)
3. Render results in **dedicated, isolated panels** (one per API)
4. Support **real-time search & filtering** across results

## 🧱 Core Requirements

### 1. 🔌 API Selection

- Preload 3–5 public APIs with defined endpoints and commands
- Show a sidebar to **activate/deactivate APIs**
- Each active API gets its own UI panel (simulate iframe-like isolation)

### 2. 💬 Chat Input

- Accept text-based commands (e.g. `get cat fact`, `search chuck car`)
- Parse input and trigger API calls
- Use **RxJS** for:
  - Input parsing stream
  - API request stream (handle loading & error states)
  - Debounced search/filtering logic

### 3. 📺 Result Panels (Simulated IFrames)

- Each API’s response is rendered in its **own visual panel**
- Use **isolated React components** to simulate iframe-like encapsulation
- Only results for a given API should appear in its panel

### 4. 🔍 Search & Filter

- Support filtering results globally or within individual panels
- Highlight matching entries
- Use **RxJS with debounced input** and efficient stream filtering

## ⚙️ Tech Stack

| Tool          | Purpose                                      |
| ------------- | -------------------------------------------- |
| React + Vite  | App framework + fast dev tooling             |
| Redux Toolkit | State management (API results, chat history) |
| RxJS          | Reactive streams for input/API flows         |
| TypeScript    | Strong static typing                         |
| Vitest        | Unit & component testing                     |
| Cypress       | End-to-end interaction testing               |

## ✅ Testing Requirements

### 🧪 Unit/Component Tests (with **Vitest**)

- Chat input parsing logic
- RxJS observable pipelines
- Result rendering per API
  for

### 🚀 E2E Tests (with **Cypress**)

- Full chat-to-response flow
- API switching behavior
- Global and per-panel filtering

## 🎁 Bonus Features (Optional)

- Chat commands like `clear`, `help`, or `history`
- “Pin” important results to top of panel
- Animations for iframe entry/exit
- Drag-and-drop or resizable panels

## 📦 Deliverables

- GitHub repository with clean commits
- `README.md` with setup, usage, and testing instructions
- Well-structured and modular folder layout

## 🌐 Public APIs to Use

### 1. 🐱 Cat Facts API

- `GET https://catfact.ninja/fact`
- **Command**: `get cat fact`

### 2. 🧠 Chuck Norris Jokes API

- `GET https://api.chucknorris.io/jokes/random`
- `GET https://api.chucknorris.io/jokes/search?query=kick`
- **Commands**: `get chuck joke`, `search chuck kick`

### 3. 🌍 Bored API

- `GET  https://bored-api.appbrewery.com/random`
- **Command**: `get activity`

### 4. 🔍 GitHub Users Search API

- `GET https://api.github.com/search/users?q=john`
- **Command**: `search github john`

### 5. 🌦️ Weather API (Open-Meteo)

- `GET https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`
- **Command**: `get weather Berlin`
- _(You can hardcode city-to-coordinates mapping in app)_

## 🗃️ Public API for Simulating Chat Message Storage

### 🔹 DummyJSON — https://dummyjson.com

Supports: `GET`, `POST`, `PUT`, `DELETE`

- Use `/comments` or `/posts` as chat message entities
- Good for simulating user-generated message storage

#### Example:

| Command                          | API Action            |
| -------------------------------- | --------------------- |
| `send message "Hello!"`          | `POST /comments`      |
| `edit message 42 "Updated text"` | `PUT /comments/42`    |
| `delete message 42`              | `DELETE /comments/42` |
