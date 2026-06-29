import type { Plugin } from 'chart.js';

export function getCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function barColorByIndex(index: number, currentIndex: number): string {
  if (index === currentIndex) return getCssVar('--color-bg-accent');      // teal — current
  if (index < currentIndex) return getCssVar('--color-bg-accent-sec');    // purple — past
  return getCssVar('--color-bg-timer');                                   // grey — future
}

export const topLabelsPlugin: Plugin<'bar'> = {
  id: 'topLabels',
  afterDatasetDraw(chart) {
    const { ctx, data } = chart;
    const dataset = chart.getDatasetMeta(0);
    const textColor = getCssVar('--color-text-light');

    ctx.save();
    ctx.font = '600 12px Nunito, sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    dataset.data.forEach((bar, i) => {
      const value = data.datasets[0].data[i] as number;
      if (!bar) return;
      const { x, y } = bar.getProps(['x', 'y'], true);
      ctx.fillText(String(value), x, y - 4);
    });

    ctx.restore();
  },
};
