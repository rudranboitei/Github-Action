# Express.js Demo App with GitHub Actions CI

A ready-to-use Express.js REST API with automated unit/integration testing configured using Jest, Supertest, and **GitHub Actions CI/CD pipeline**.

---

## 🚀 Features

- **Express 5 REST API** with modular architecture (`app.js` and `index.js` separated for clean testing).
- **Automated Tests** using Jest and Supertest.
- **GitHub Actions CI Pipeline** (`.github/workflows/ci.yml`) testing on Node.js matrix (`18.x`, `20.x`, `22.x`).
- Health-check and CRUD endpoints.

---

## 📁 Project Structure

```text
Github-Action/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow
├── src/
│   ├── app.js              # Express app definition & routes
│   └── index.js            # Server entry point (starts listener)
├── tests/
│   └── app.test.js         # API endpoint tests with Jest & Supertest
├── .env.example            # Sample environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
└── README.md
```

---

## 🛠️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and route directory |
| `GET` | `/api/health` | Health check (uptime, status, timestamp) |
| `GET` | `/api/items` | List all items |
| `GET` | `/api/items/:id` | Get single item by ID |
| `POST` | `/api/items` | Create new item (requires `{ "name": "string" }`) |

---

## 💻 Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
# Production mode
npm start

# Development mode (auto-reloads on file changes)
npm run dev
```
The server will start at [http://localhost:3000](http://localhost:3000).

### 3. Run Tests
```bash
npm test
```

---

## 🤖 GitHub Actions CI Workflow

The workflow file is located at [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

### When it runs:
1. **On Push**: Whenever you push commits to `main` or `master`.
2. **On Pull Request**: Whenever a PR is opened targeting `main` or `master`.
3. **Manual Trigger (`workflow_dispatch`)**: From the **Actions** tab on GitHub.

### What it does:
1. Spawns clean Ubuntu runners for Node versions **18**, **20**, and **22**.
2. Checks out your repository code.
3. Installs dependencies using `npm ci` (fast, reliable dependency install).
4. Runs `npm test` to ensure all tests pass before changes can be merged.

---

## 🧪 How to Test GitHub Actions

1. Commit and push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: setup Express app with GitHub Actions CI"
   git push origin main
   ```

2. Go to your repository on GitHub and click on the **Actions** tab.
3. You will see the **Node.js CI** workflow running for your commit!
4. *(Optional Experiment)* Try modifying a test in `tests/app.test.js` to intentionally fail, push it, and see how GitHub Actions flags the failing build with a ❌.