import DashboardWrapper from '../pageWrappers/DashboardWrapper';
import DashboardHeader from './DashboardHeader';
import CardGrid from '../common/CardGrid';
import MonthlyChart from './MonthlyChart';
import useMonthlyStats from '../../hooks/useMonthlyStats';

export default function StatisticsPage() {
  const { totalStretches, weeklyAverage, bestMonth, perMonth, monthLabels, isLoading } =
    useMonthlyStats();

  return (
    <DashboardWrapper>
      <div className="dashboard-page">
        <DashboardHeader title="Your stretch story" text="A look back at the stretches." />

        <CardGrid
          ordered={false}
          variant="white"
          columns={3}
          items={[
            {
              title: isLoading ? '—' : String(totalStretches),
              text: 'Total stretches',
            },
            {
              title: isLoading ? '—' : String(weeklyAverage),
              text: 'Weekly average',
            },
            {
              title: isLoading ? '—' : bestMonth,
              text: 'Best month',
            },
          ]}
        />

        {!isLoading && <MonthlyChart perMonth={perMonth} monthLabels={monthLabels} />}
      </div>
    </DashboardWrapper>
  );
}
