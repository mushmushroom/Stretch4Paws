import DashboardWrapper from '../pageWrappers/DashboardWrapper';
import DashboardHeader from './DashboardHeader';
import { useAuth } from '../../context/authContext/useAuth';
import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import LogoutButton from '../common/LogoutButton';
import Divider from '../common/Divider';
import WebSettings from './WebSettings';

export default function ProfilePage() {
  const { profile, user } = useAuth();

  return (
    <DashboardWrapper>
      <div className="dashboard-page">
        <DashboardHeader title="Profile" text="Manage your account." />

        <div className="profile-card">
          <div className="profile-card__info">
            <div className="profile-card__name-block">
              <h2 className="profile-card__name">{profile?.name}</h2>
              <p className="profile-card__email">{user?.email}</p>
            </div>
            <Link className="btn btn--purple" to={AppRoutes.DASHBOARD_EDIT_PROFILE}>
              Edit
            </Link>
          </div>
        </div>

        <WebSettings />

        <div className="profile-card">
          <Link className="profile-card__action" to={AppRoutes.DASHBOARD_CHANGE_PASSWORD}>
            Change password
          </Link>
          <Divider />
          <LogoutButton className="profile-card__action profile-card__action--danger" />
        </div>
      </div>
    </DashboardWrapper>
  );
}
