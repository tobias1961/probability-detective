# Test Report

## Automated

Command:

```bash
python3 tests/test_probability.py
```

Result: **PASS**.

The automated suite covers:
- coin counts summing to the requested trials;
- exact P=0 and P=1 coin behavior;
- seeded/injected randomness support for reproducible tests;
- dice counts summing to the requested trials and valid outcome ranges;
- one-die and two-dice theoretical probabilities;
- game probability validation;
- expected-point calculations;
- simulated game rounds summing to the requested number of rounds.

## Manual verification checklist

- [x] Public static preview loads through HTTPS after GitHub Pages deployment.
- [x] Navigation exposes all three investigations and the completion summary.
- [x] Prediction is required conceptually before the coin experiment and receives specific feedback.
- [x] Coin trials support 10, 100 and 1000.
- [x] Dice chart is paired with an equivalent data table.
- [x] Fair-game designer calculates expected points and performs an actual generated-round simulation.
- [x] Final challenge provides a new prediction-and-feedback step.
- [x] Hint, reset/replay, and local progress storage are present.
- [x] No login, wallet, payment, email, personal data, tracking, ads, uploads, or runtime AI.
- [x] Responsive CSS targets 360px, 768px and 1280px layouts.
- [x] Keyboard focus is visibly styled; chart information also appears in a table.
- [x] Reduced-motion preference is respected.
