import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { barColorByIndex, getCssVar, topLabelsPlugin } from '../../lib/chartUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface MonthlyChartProps {
  perMonth: number[];
  monthLabels: string[];
}

export default function MonthlyChart({ perMonth, monthLabels }: MonthlyChartProps) {
  // current month is the last bucket (index 5)
  const currentIdx = perMonth.length - 1;
  const maxVal = Math.max(...perMonth, 1);
  const canvasHeight = Math.min(Math.max(160, maxVal * 8), 320);

  const data = {
    labels: monthLabels,
    datasets: [
      {
        data: perMonth,
        backgroundColor: perMonth.map((val, i) =>
          val === 0 ? getCssVar('--color-bg-timer') : barColorByIndex(i, currentIdx)
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
    <div className="bar-chart">
      <h4 className="bar-chart__title">Last 6 months</h4>
      <div className="bar-chart__canvas-wrap" style={{ height: canvasHeight }}>
        <Bar data={data} options={options} plugins={[topLabelsPlugin]} />
      </div>
    </div>
  );
}
