# Probability Detective

Static interactive probability lesson for learners around age 12+.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a modern browser.

## Deploy

GitHub Pages: publish the `main` branch from the repository root (`/`). `index.html` and `app.js` must remain at the repository root.

## Test

```bash
python3 tests/test_probability.py
```

The automated suite runs the JavaScript domain tests with Node.js. It verifies trial totals, exact P=0/P=1 coin behavior, dice outcome ranges and theoretical probabilities, probability validation, seeded reproducibility support, expected points, and game simulation totals.

## Architecture

The lesson is client-side only. `index.html` contains the learner-facing interface and `app.js` contains reusable probability/domain functions. Browser experiments use `Math.random`; tests can inject the deterministic `seededRandom(seed)` function, making domain behavior reproducible without changing the learner experience. Charts and tables are rendered from generated trial data. Progress is stored only in browser `localStorage`.

The Fair-Game Designer uses non-monetary points only. It calculates expected points and also simulates generated rounds so learners can compare theoretical and observed results.

No server, login, wallet, payment, tracking, analytics, advertising, upload, paid API, or runtime AI is required.
