import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  type Plugin,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { barColorByIndex, getCssVar, topLabelsPlugin } from '../../lib/chartUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface WeeklyChartProps {
  perDay: number[];
}

export default function WeeklyChart({ perDay }: WeeklyChartProps) {
  const TODAY = new Date().getDay();

  // wrap shared plugin to skip future days
  const weeklyTopLabels: Plugin<'bar'> = {
    ...topLabelsPlugin,
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
        if (i > TODAY) return; // skip future days
        const value = data.datasets[0].data[i] as number;
        const { x, y } = bar.getProps(['x', 'y'], true);
        ctx.fillText(String(value), x, y - 4);
      });

      ctx.restore();
    },
  };
  const maxVal = Math.max(...perDay, 1);
  const canvasHeight = Math.max(140, maxVal * 28);

  const data = {
    labels: DAYS,
    datasets: [
      {
        data: perDay,
        backgroundColor: DAYS.map((_, i) =>
          perDay[i] === 0 ? getCssVar('--color-bg-timer') : barColorByIndex(i, TODAY)
        ),
        borderRadius: 8,
        borderSkipped: false,
        minBarLength: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: getCssVar('--color-text-light'),
          font: { size: 12, weight: 600 },
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grace: '20%',
      },
    },
  };

  return (
    <div className="weekly-chart">
      <h4 className="weekly-chart__title">This week</h4>
      <div className="weekly-chart__canvas-wrap" style={{ height: canvasHeight }}>
        <Bar data={data} options={options} plugins={[weeklyTopLabels]} />
      </div>
    </div>
  );
}
