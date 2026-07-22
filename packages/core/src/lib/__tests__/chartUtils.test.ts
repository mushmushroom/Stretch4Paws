// Note: getCssVar reads from document.documentElement, so tests mock it via
// vi.spyOn. topLabelsPlugin.afterDatasetDraw is tested with a minimal chart
// stub — the canvas 2D context API is mocked manually since jsdom doesn't
// implement it. The return value of getCssVar in real usage is a CSS custom
// property value resolved at runtime; tests assert on the mock-supplied string.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCssVar, barColorByIndex, topLabelsPlugin } from '../chartUtils';

// ─── getCssVar ───────────────────────────────────────────────────────────────

describe('getCssVar', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns the trimmed value of a CSS custom property', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (_name: string) => '  #abc123  ',
    } as unknown as CSSStyleDeclaration);

    expect(getCssVar('--color-bg-accent')).toBe('#abc123');
  });

  it('returns an empty string when the property is not set', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (_name: string) => '',
    } as unknown as CSSStyleDeclaration);

    expect(getCssVar('--undefined-var')).toBe('');
  });
});

// ─── barColorByIndex ─────────────────────────────────────────────────────────

describe('barColorByIndex', () => {
  const ACCENT = 'teal';
  const ACCENT_SEC = 'purple';
  const TIMER = 'grey';

  beforeEach(() => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (name: string) => {
        if (name === '--color-bg-accent') return ACCENT;
        if (name === '--color-bg-accent-sec') return ACCENT_SEC;
        if (name === '--color-bg-timer') return TIMER;
        return '';
      },
    } as unknown as CSSStyleDeclaration);
  });

  afterEach(() => vi.restoreAllMocks());

  it('returns accent color when index equals currentIndex (current bar)', () => {
    expect(barColorByIndex(2, 2)).toBe(ACCENT);
  });

  it('returns accent-sec color when index is before currentIndex (past bar)', () => {
    expect(barColorByIndex(1, 3)).toBe(ACCENT_SEC);
    expect(barColorByIndex(0, 3)).toBe(ACCENT_SEC);
  });

  it('returns timer color when index is after currentIndex (future bar)', () => {
    expect(barColorByIndex(4, 2)).toBe(TIMER);
    expect(barColorByIndex(10, 0)).toBe(TIMER);
  });

  it('handles index 0 as current', () => {
    expect(barColorByIndex(0, 0)).toBe(ACCENT);
  });
});

// ─── topLabelsPlugin ─────────────────────────────────────────────────────────

describe('topLabelsPlugin', () => {
  afterEach(() => vi.restoreAllMocks());

  it('has id "topLabels"', () => {
    expect(topLabelsPlugin.id).toBe('topLabels');
  });

  it('calls ctx methods and renders labels for each bar', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (_name: string) => '#fff',
    } as unknown as CSSStyleDeclaration);

    const fillText = vi.fn();
    const save = vi.fn();
    const restore = vi.fn();

    const mockBar = {
      getProps: (_props: string[], _final: boolean) => ({ x: 10, y: 20 }),
    };

    const mockChart = {
      ctx: {
        save,
        restore,
        fillText,
        font: '',
        fillStyle: '',
        textAlign: '',
        textBaseline: '',
      },
      data: {
        datasets: [{ data: [5, 10, 15] }],
      },
      getDatasetMeta: (_index: number) => ({
        data: [mockBar, mockBar, mockBar],
      }),
    };

    topLabelsPlugin.afterDatasetDraw!(mockChart as never, {} as never, {} as never);

    expect(save).toHaveBeenCalledOnce();
    expect(restore).toHaveBeenCalledOnce();
    expect(fillText).toHaveBeenCalledTimes(3);
    expect(fillText).toHaveBeenNthCalledWith(1, '5', 10, 16);
    expect(fillText).toHaveBeenNthCalledWith(2, '10', 10, 16);
    expect(fillText).toHaveBeenNthCalledWith(3, '15', 10, 16);
  });

  it('skips bars where the element is falsy', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (_name: string) => '#fff',
    } as unknown as CSSStyleDeclaration);

    const fillText = vi.fn();

    const mockChart = {
      ctx: {
        save: vi.fn(),
        restore: vi.fn(),
        fillText,
        font: '',
        fillStyle: '',
        textAlign: '',
        textBaseline: '',
      },
      data: {
        datasets: [{ data: [5, 10] }],
      },
      getDatasetMeta: (_index: number) => ({
        // second element is null/falsy
        data: [
          { getProps: () => ({ x: 5, y: 10 }) },
          null,
        ],
      }),
    };

    topLabelsPlugin.afterDatasetDraw!(mockChart as never, {} as never, {} as never);

    expect(fillText).toHaveBeenCalledTimes(1);
  });
});
