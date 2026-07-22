import { describe, it, expect } from 'vitest';
import { zxcvbn } from '../zxcvbn';

// zxcvbn scores range 0–4:
//   0 = too guessable, 1 = very guessable, 2 = somewhat guessable,
//   3 = safely unguessable, 4 = very unguessable

describe('zxcvbn password strength', () => {
  it('scores a common weak password as 0', () => {
    const result = zxcvbn.check('password');
    expect(result.score).toBe(0);
  });

  it('scores a sequential number string as 0', () => {
    const result = zxcvbn.check('123456');
    expect(result.score).toBe(0);
  });

  it('scores a short simple password as 0 or 1', () => {
    const result = zxcvbn.check('abc');
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it('scores a moderately complex password higher than a weak one', () => {
    const weak = zxcvbn.check('password');
    const moderate = zxcvbn.check('Tr0ub4dor&3');
    expect(moderate.score).toBeGreaterThan(weak.score);
  });

  it('scores a long random passphrase as 3 or 4', () => {
    const result = zxcvbn.check('correct-horse-battery-staple-42!');
    expect(result.score).toBeGreaterThanOrEqual(3);
  });

  it('scores a strong mixed-character password as 3 or 4', () => {
    const result = zxcvbn.check('kX9#mP2$vL7@nQ5!');
    expect(result.score).toBeGreaterThanOrEqual(3);
  });

  it('returns a numeric score between 0 and 4 inclusive', () => {
    const passwords = ['hello', 'Hello1!', 'Correct-Horse-Battery-99#'];
    for (const pw of passwords) {
      const { score } = zxcvbn.check(pw);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(4);
    }
  });

  it('returns guesses_log10 that grows with password complexity', () => {
    const weak = zxcvbn.check('password123');
    const strong = zxcvbn.check('kX9#mP2$vL7@nQ5!');
    expect(strong.guessesLog10).toBeGreaterThan(weak.guessesLog10);
  });

  it('returns feedback for a weak password', () => {
    const result = zxcvbn.check('password');
    // feedback.warning or suggestions should be present for score 0
    const hasFeedback =
      result.feedback.warning !== '' || result.feedback.suggestions.length > 0;
    expect(hasFeedback).toBe(true);
  });

  it('handles an empty string without throwing', () => {
    expect(() => zxcvbn.check('')).not.toThrow();
    expect(zxcvbn.check('').score).toBe(0);
  });
});
