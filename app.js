(function (global) {
  "use strict";

  function clampProbability(p) {
    const n = Number(p);
    return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
  }

  // Deterministic PRNG for reproducible tests; the UI uses Math.random by default.
  function seededRandom(seed) {
    let state = (Number(seed) >>> 0) || 1;
    return function () {
      state = (state + 0x6D2B79F5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function runCoinExperiment(p, trials, rng) {
    p = clampProbability(p);
    trials = Math.max(0, Math.floor(Number(trials)));
    rng = rng || Math.random;
    let heads = 0;
    for (let i = 0; i < trials; i += 1) {
      if (rng() < p) heads += 1;
    }
    return { heads, tails: trials - heads, trials, proportion: trials ? heads / trials : 0, p };
  }

  function diceRoll(rng) {
    return 1 + Math.floor((rng || Math.random)() * 6);
  }

  function runDiceExperiment(mode, trials, rng) {
    trials = Math.max(0, Math.floor(Number(trials)));
    rng = rng || Math.random;
    const values = mode === "faces" ? [1, 2, 3, 4, 5, 6] : Array.from({ length: 11 }, (_, i) => i + 2);
    const counts = Object.fromEntries(values.map(v => [v, 0]));
    for (let i = 0; i < trials; i += 1) {
      const a = diceRoll(rng);
      const b = mode === "faces" ? 0 : diceRoll(rng);
      counts[a + b] += 1;
    }
    return { mode, trials, values, counts };
  }

  function theoreticalDiceProbability(mode, value) {
    if (mode === "faces") return value >= 1 && value <= 6 ? 1 / 6 : 0;
    const ways = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
    return value >= 2 && value <= 12 ? ways[value - 2] / 36 : 0;
  }

  function expectedPoints(probability, points) {
    return clampProbability(probability) * Number(points);
  }

  function validateGame(aPoints, bPoints, aProb, bProb) {
    const ap = Number(aPoints), bp = Number(bPoints), aq = Number(aProb), bq = Number(bProb);
    const validNumbers = [ap, bp, aq, bq].every(Number.isFinite);
    const probabilitiesValid = aq >= 0 && aq <= 1 && bq >= 0 && bq <= 1 && Math.abs((aq + bq) - 1) < 1e-9;
    return { valid: validNumbers && probabilitiesValid, ap, bp, aq, bq };
  }

  function simulateGame(aPoints, bPoints, aProb, bProb, rounds, rng) {
    const check = validateGame(aPoints, bPoints, aProb, bProb);
    if (!check.valid) throw new Error("Probabilities must be between 0 and 1 and add to 1.");
    rounds = Math.max(0, Math.floor(Number(rounds)));
    rng = rng || Math.random;
    let aWins = 0, bWins = 0, aScore = 0, bScore = 0;
    for (let i = 0; i < rounds; i += 1) {
      if (rng() < check.aq) { aWins += 1; aScore += check.ap; }
      else { bWins += 1; bScore += check.bp; }
    }
    return {
      rounds, aWins, bWins, aScore, bScore,
      observedA: rounds ? aScore / rounds : 0,
      observedB: rounds ? bScore / rounds : 0,
      expectedA: expectedPoints(check.aq, check.ap),
      expectedB: expectedPoints(check.bq, check.bp)
    };
  }

  const api = { clampProbability, seededRandom, runCoinExperiment, runDiceExperiment, theoreticalDiceProbability, expectedPoints, validateGame, simulateGame };
  global.ProbabilityDetective = api;

  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
