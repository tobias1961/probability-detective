# Probability Detective
Static interactive lesson for learners around age 12.
Run locally with `python3 -m http.server 8000` and open `http://localhost:8000/`.
Deploy from `main` and repository root with GitHub Pages. Modern Chrome, Firefox, Safari or Edge with JavaScript/localStorage. No server, secret, paid API or runtime AI is required.
Architecture: client-side activity state is kept in memory/localStorage. Coin and dice experiments use browser randomness; charts and tables derive from the generated counts. Fairness uses expected points = probability × reward.
Known limitation: learner-facing random runs intentionally vary; domain tests use deterministic calculations.
