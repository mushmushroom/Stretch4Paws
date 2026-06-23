import { Link } from 'react-router';
import { useAuth } from '../../context/authContext/useAuth';
import DashboardWrapper from '../pageWrappers/DashboardWrapper';
import { AppRoutes } from '../../lib/constants';
import CardGrid from '../common/CardGrid';
import useStats from '../../hooks/useStats';
import useGoal from '../../hooks/useGoal';
import DashboardHeader from '../dashboard/DashboardHeader';

export default function DashboardPage() {
  const { profile } = useAuth();
  const { today, thisWeek, streak, goalProgress, isLoading } = useStats();
  const { goal } = useGoal();

  return (
    <DashboardWrapper>
      <div className="dashboard-page">
        <div className="dashboard-page__header">
          <DashboardHeader
            title={`Good morning, ${profile?.name?.split(' ')[0]}!`}
            text={`${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · let's loosen up those shoulders.`}
          />
          <Link className="btn" to={AppRoutes.STRETCHES}>
            Start stretching
          </Link>
        </div>

        <div>
          <CardGrid
            ordered={false}
            variant="white"
            items={[
              {
                title: isLoading ? '—' : `${String(today)}/${goal}`,
                text: "Today's stretches",
              },
              {
                title: isLoading ? '—' : String(thisWeek),
                text: 'Completed this week',
              },
              {
                title: isLoading ? '—' : `${streak} d`,
                text: 'Current streak',
              },
            ]}
          />
        </div>

        <div>
          <div>chart</div>
          <div>
            <div>pawsome work</div>
            <div>daily goal</div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
