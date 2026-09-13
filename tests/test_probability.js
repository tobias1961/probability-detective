const assert = require('assert');
const P = require('../app.js');

const rng = P.seededRandom(42);
const coin = P.runCoinExperiment(0.5, 100, rng);
assert.strictEqual(coin.heads + coin.tails, 100);
assert.deepStrictEqual(P.runCoinExperiment(1, 10, P.seededRandom(1)).heads, 10);
assert.deepStrictEqual(P.runCoinExperiment(0, 10, P.seededRandom(1)).heads, 0);

const dice = P.runDiceExperiment('sums', 200, P.seededRandom(42));
assert.strictEqual(Object.values(dice.counts).reduce((a,b)=>a+b,0), 200);
assert.strictEqual(dice.values.every(v => v >= 2 && v <= 12), true);
assert.strictEqual(P.theoreticalDiceProbability('faces', 1), 1/6);
assert.strictEqual(P.theoreticalDiceProbability('sums', 7), 6/36);

assert.strictEqual(P.validateGame(8, 2.67, 0.25, 0.75).valid, true);
assert.strictEqual(P.validateGame(8, 4, 0.25, 0.75).valid, true);
assert.strictEqual(P.validateGame(8, 4, 0.25, 0.60).valid, false);
const sim = P.simulateGame(8, 2.67, 0.25, 0.75, 1000, P.seededRandom(42));
assert.strictEqual(sim.aWins + sim.bWins, 1000);
assert.strictEqual(sim.expectedA, 2);
assert.strictEqual(sim.expectedB, 2.0025);

console.log('PASS: probability domain, seeded randomness, and game simulation tests');
